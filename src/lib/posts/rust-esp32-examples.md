---
title: "Rust ESP32 Examples"
tagline: "A collection of code examples for an ESP32 written in Rust"
publishedOn: 2026-10-05
tags: ["rust", "esp32", "hardware"]
---

# Rust ESP32 Examples

[github.com/bobbymannino/esp32-rust-examples](https://github.com/bobbymannino/esp32-rust-examples)

## The Setup

Every example is its own crate under `crates/`, generated from the same
template. They all use [`esp-idf-svc`](https://docs.rs/esp-idf-svc), which wraps
ESP-IDF in a Rust API and gives you the standard library (`std`), so things like
threads, `TcpListener` and `Mutex` all work as you would expect.

The important part of the template is `.cargo/config.toml`:

```toml
[build]
target = "xtensa-esp32-espidf"

[target.xtensa-esp32-espidf]
linker = "ldproxy"
runner = "espflash flash --monitor"
rustflags = ["--cfg", "espidf_time64"]

[unstable]
build-std = ["std", "panic_abort"]

[env]
MCU = "esp32"
ESP_IDF_VERSION = "v5.5.4"
```

Setting the `runner` to `espflash` means `cargo run` builds the firmware,
flashes it to the board and opens a serial monitor in one go. If you want to
know more about `espflash` I wrote about it in
[espflash Commands](/blog/espflash-commands).

The `main` function is the same in almost every example. It links the ESP-IDF
patches, sets up logging, and then hands off to a `run` function that returns an
`anyhow::Result` so `?` can be used everywhere:

```rs
fn main() {
  esp_idf_svc::sys::link_patches();
  esp_idf_svc::log::EspLogger::initialize_default();

  match run() {
    Ok(()) => {}
    Err(e) => {
      eprint!("{}", e);
      std::process::exit(1);
    }
  }
}

fn run() -> anyhow::Result<()> {
  todo!();
}
```

If `anyhow` is new to you, take a look at [Rust: anyhow](/blog/rust-anyhow).

## Projects

As of writing this post, there are the following projects:

| Project        | Description                                    |
| -------------- | ---------------------------------------------- |
| UART           | Send and receive data over UART                |
| WiFi WPA2/WPA3 | Connect to WiFi using WPA2/WPA3 authentication |
| Bluetooth      | Connect to Bluetooth devices                   |
| API Client     | Execute HTTP requests                          |
| API Server     | Host HTTP endpoints on the ESP32               |
| TCP Server     | Create a TCP server on the ESP32               |
| Power Modes    | Different power and sleep modes                |
| ADXL345        | Implement controls for the ADXL345 component   |

## UART

The simplest example, and the best one to start with. It reads bytes from UART0
(the same port the USB cable uses) and writes them straight back.

```rs
let tx = peripherals.pins.gpio1;
let rx = peripherals.pins.gpio3;

let config = Config::new().baudrate(Hertz(115_200));

let uart = UartDriver::new(
  peripherals.uart0,
  tx,
  rx,
  Option::<gpio::AnyIOPin>::None,
  Option::<gpio::AnyIOPin>::None,
  &config,
)?;
```

The two `None` pins are the RTS and CTS pins for hardware flow control, which
are not needed here. Once it is flashed you can open a `screen` session on the
port and anything you type will be echoed back:

```sh
# Your USB port will be different
screen /dev/cu.usbserial-1130 115200
# To exit: <Ctrl-A> <k> <y>
```

For more on how UART itself works, see [UART Protocol](/blog/uart-protocol).

## WiFi WPA2/WPA3

This example joins a WPA2 or WPA3 network and stays connected. The WiFi
credentials are read at compile time with `env!`, so they never end up in the
repository:

```rs
const SSID: &str = env!("WIFI_SSID", "set WIFI_SSID to the network to join");
const PASSWORD: &str = env!("WIFI_PASSWORD", "set WIFI_PASSWORD to the network's password");
```

```sh
WIFI_SSID="My Network" WIFI_PASSWORD="hunter2" cargo run
```

If either variable is missing the build fails with the message given as the
second argument, rather than flashing firmware that can never connect.

Rather than guessing the security of the network, the ESP32 scans for it first
and connects with whatever the access point actually advertises. This is what
lets the same firmware work with a WPA2 network, a WPA3 network, or an access
point running both:

```rs
fn negotiate_auth_method(access_point: Option<&AccessPointInfo>) -> AuthMethod {
  match access_point.and_then(|ap| ap.auth_method) {
    Some(AuthMethod::None) => {
      log::warn!("{SSID} is an open network, but this example is built for WPA2/WPA3");
      AuthMethod::WPA2WPA3Personal
    }
    Some(auth_method) => auth_method,
    None => AuthMethod::WPA2WPA3Personal,
  }
}
```

`WPA2WPA3Personal` is a _minimum_, so falling back to it still works for hidden
networks while refusing anything weaker than WPA2.

WPA3 also requires Protected Management Frames (PMF), which stop an attacker
forging the frames used in deauthentication attacks. Requiring PMF on a
WPA2-only access point that does not support it means you never connect, so it
is only required when the network is WPA3:

```rs
fn pmf_for(auth_method: AuthMethod) -> PmfConfiguration {
  PmfConfiguration::Capable {
    required: auth_method == AuthMethod::WPA3Personal,
  }
}
```

WPA3 also needs to be turned on in `sdkconfig.defaults`:

```text
CONFIG_ESP_WIFI_ENABLE_WPA3_SAE=y
CONFIG_ESP_WIFI_ENABLE_SAE_H2E=y
```

Two things caught me out here:

1. `wifi.connect()` returning `Ok` only means the ESP32 has associated with the
   access point. DHCP runs afterwards, so you also need `wifi.wait_netif_up()`
   before you have an IP address.
2. Nothing reconnects for you. If the connection drops the driver reports it and
   leaves the rest to you, so the example checks `wifi.is_connected()` every 5
   seconds and reconnects if needed.

## Bluetooth

This is the most involved example. It scans for a BLE device by its advertised
name and connects to it as a GATT client.

```sh
BT_DEVICE_NAME="My Sensor" cargo run
```

The Bluedroid stack is entirely callback driven: every call only _queues_ the
work, and the result arrives later as an event on the Bluetooth task. To make
`connect` behave like a normal blocking function, the client keeps its progress
in a `Mutex` and uses a `Condvar` to wake up whoever is waiting:

```rs
enum Phase {
  Idle,
  Scanning(String),
  Connecting(BdAddr),
  Connected(Connection),
  Failed(String),
}
```

The event handlers move the client through each `Phase` (scan parameters set →
scanning → device found → connecting → connected), and `connect` waits until the
phase is no longer pending:

```rs
let (mut state, _) = self
  .changed
  .wait_timeout_while(state, CONNECT_TIMEOUT, |state| state.phase.is_pending())
  .unwrap();
```

If you have not used `Mutex` or `Arc` much, I covered them in
[Rust: Rc v Arc v Mutex](/blog/rust-rc-v-arc-v-mutex).

Bluetooth is off by default, so `sdkconfig.defaults` turns on Bluedroid in
BLE-only mode. Classic Bluetooth is left out because Bluedroid is memory hungry:

```text
CONFIG_BT_ENABLED=y
CONFIG_BT_BLUEDROID_ENABLED=y
CONFIG_BT_CLASSIC_ENABLED=n
CONFIG_BTDM_CTRL_MODE_BLE_ONLY=y
```

## API Client

This example sends a `POST` request to a server every 5 seconds with an
incrementing counter. The repository includes a tiny TypeScript server (run with
Bun) that echoes the body back.

```sh
WIFI_SSID=<ssid> WIFI_PASSWORD=<password> IP=<server ip> PORT=<server port> cargo run
```

The HTTP connection is wrapped in a small `ApiClient` struct so the connection
is reused between requests rather than reopened every time:

```rs
fn post(&mut self, path: &str, body: &str) -> anyhow::Result<u16> {
  let url = format!("{}{path}", self.base_url);
  // Giving the length up front stops the client falling back to chunked transfer encoding.
  let content_length = body.len().to_string();
  let headers = [
    ("Content-Type", "text/plain"),
    ("Content-Length", content_length.as_str()),
  ];

  self.connection.initiate_request(Method::Post, &url, &headers)?;
  self.connection.write_all(body.as_bytes())?;
  self.connection.initiate_response()?;

  Ok(self.connection.status())
}
```

A failed request is logged rather than returned, so a server restart or a
dropped packet does not bring the whole device down.

## API Server

The opposite of the client: the ESP32 hosts HTTP endpoints that other devices on
the network can call. It exposes the real-time clock (RTC) at `/api/rtc`.

| Method | Path       | Request                                   | Response       |
| ------ | ---------- | ----------------------------------------- | -------------- |
| GET    | `/api/rtc` |                                           | `{"rtc":1234}` |
| POST   | `/api/rtc` | `text/plain` seconds since the Unix epoch | `{"rtc":1234}` |

Handlers are registered on an `EspHttpServer` with a path and method:

```rs
server.fn_handler("/api/rtc", Method::Get, |req| {
  let body = format!(r#"{{"rtc":{}}}"#, rtc_seconds());
  req.into_response(200, None, &[("Content-Type", "application/json")])?
    .write_all(body.as_bytes())
})?;
```

Once it is running you can set the clock from your machine:

```sh
curl -H "Content-Type: text/plain" -d "$(date +%s)" http://<ip>/api/rtc
```

The `POST` handler reads the body into a fixed 32-byte buffer and responds with
`415`, `413` or `400` for the wrong content type, a body that is too long, or a
body that is not a number. On a device with very little RAM it is worth being
strict about how much you read.

The server runs on its own task, so the main task just has to keep `wifi` and
`server` alive. If either is dropped it stops working:

```rs
loop {
  FreeRtos::delay_ms(u32::MAX);
}
```

## TCP Server

An echo server: anything a client sends is sent straight back. Because
`esp-idf-svc` gives us `std`, this is just a normal Rust `TcpListener` with a
thread per client:

```rs
for stream in listener.incoming() {
  let stream = match stream {
    Ok(stream) => stream,
    Err(e) => {
      log::warn!("accept failed: {e}");
      continue;
    }
  };

  let spawned = thread::Builder::new().stack_size(CLIENT_STACK_BYTES).spawn(move || {
    if let Err(e) = handle_client(stream) {
      log::warn!("client error: {e:#}");
    }
  });
  if let Err(e) = spawned {
    log::warn!("could not start a thread for the client: {e}");
  }
}
```

Each thread gets an 8 KB stack, and a client that sends nothing for 30 seconds
is disconnected so a client that vanishes does not hold a socket forever. lwIP
only allows 10 sockets by default and the listener uses one of them, so at most
9 clients can be connected at a time.

```sh
WIFI_SSID="My Network" WIFI_PASSWORD="password" PORT=8080 cargo run
nc <ip> 8080
```

The one surprise here was WiFi power saving. By default the radio sleeps between
beacons and can miss the ARP requests other devices send to find it. The ESP32
could still make outgoing connections, but nothing could connect to it. Turning
power saving off fixed it:

```rs
esp!(unsafe { esp_wifi_set_ps(wifi_ps_type_t_WIFI_PS_NONE) })?;
```

## Power Modes

The ESP32 has 5 power modes. Each one turns off more of the chip than the one
before it, so it draws less current, but takes longer to wake up and keeps less
of its state.

| Mode        | Running Components                          | Typical Current | Wake Up Time         |
| ----------- | ------------------------------------------- | --------------- | -------------------- |
| Active      | Everything                                  | 95 - 240 mA     | N/A                  |
| Modem Sleep | CPU, RAM, peripherals (radio off)           | 20 - 68 mA      | Immediate            |
| Light Sleep | RAM (retained), RTC, ULP (CPU paused)       | 0.8 mA          | < 1 ms               |
| Deep Sleep  | RTC controller, RTC memory, RTC peripherals | 10 - 150 µA     | Full reboot (~100ms) |
| Hibernate   | RTC timer and RTC GPIOs only                | 5 µA            | Full reboot (~100ms) |

> These figures are from the ESP32 datasheet and are for the chip alone. A dev
> board will draw a lot more because of the USB-to-UART chip, voltage regulator
> and power LED.

The example is a set of functions, one for each mode, that you can copy into
your own project. Light sleep and deep sleep look almost identical, but the
return types show the difference:

```rs
fn light_sleep(duration: Duration) -> Result<(), EspError> {
  LightSleep::new()?.wakeup_on_timer(duration)?.enter()
}

fn deep_sleep(duration: Duration) -> Result<Infallible, EspError> {
  DeepSleep::new()?.wakeup_on_timer(duration)?.enter()
}
```

Light sleep keeps RAM powered, so execution carries on from the next line once
it wakes. Waking from deep sleep is a full reboot and `main` runs again from the
top, so `deep_sleep` can never return `Ok`. `Infallible` makes the compiler
enforce that. Anything that needs to survive deep sleep has to be stored in RTC
memory or flash.

Hibernate does not have its own API. It is deep sleep with the RTC peripherals
and RTC memory powered down as well:

```rs
fn hibernate(duration: Duration) -> Result<Infallible, EspError> {
  let domains = [
    sys::esp_sleep_pd_domain_t_ESP_PD_DOMAIN_RTC_PERIPH,
    sys::esp_sleep_pd_domain_t_ESP_PD_DOMAIN_RTC_SLOW_MEM,
    sys::esp_sleep_pd_domain_t_ESP_PD_DOMAIN_RTC_FAST_MEM,
    sys::esp_sleep_pd_domain_t_ESP_PD_DOMAIN_XTAL,
  ];

  for domain in domains {
    esp!(unsafe { sys::esp_sleep_pd_config(domain, sys::esp_sleep_pd_option_t_ESP_PD_OPTION_OFF) })?;
  }

  deep_sleep(duration)
}
```

There are also versions that wake on a GPIO pin instead of a timer. The ESP32
can only wake on a pin _level_, not an edge, so they wake on whichever level the
pin is not currently at. For deep sleep the pin must also be an RTC GPIO (0, 2,
4, 12-15, 25-27 and 32-39 on the ESP32).

## ADXL345

The last example ties a few of the others together. The ADXL345 is a 3-axis
accelerometer that talks to the ESP32 over I2C.

| ADXL345 | ESP32  | Notes                               |
| ------- | ------ | ----------------------------------- |
| SDA     | GPIO21 | I2C data, internal pull-up enabled  |
| SCL     | GPIO22 | I2C clock, internal pull-up enabled |
| INT1    | GPIO23 | Wakes the ESP32 from light sleep    |

The driver is a struct that wraps the `I2cDriver` and hides the register
addresses behind methods. Creating one checks the device ID, so wiring mistakes
show up straight away:

```rs
let mut adxl345 = ADXL345::new(i2c)?;
let (x, y, z) = adxl345.read_raw()?; // in mg
```

Every register access comes down to two small helpers. Reading writes the
register address and then reads a byte back, and writing sends the address
followed by the value:

```rs
fn read_command(&mut self, address: u8) -> Result<u8> {
  let mut buffer = [0u8; 1];
  self.i2c_driver.write_read(ADDRESS_I2C, &[address], &mut buffer, self.timeout)?;
  Ok(buffer[0])
}

fn write_command(&mut self, address: u8, data: u8) -> Result<()> {
  self.i2c_driver.write(ADDRESS_I2C, &[address, data], self.timeout)?;
  Ok(())
}
```

The interesting part is the main loop. While the sensor is moving it reads every
100ms. Once it is still, the ESP32 arms the ADXL345's activity interrupt with a
1g threshold and goes into light sleep. When the sensor detects movement it
pulls INT1 high, which wakes the ESP32 and the loop starts again:

```rs
adxl345.enable_interupt_activity(f32::from(MG_THRESHOLD))?;
LightSleep::new()?.wakeup_on_gpio(&int_pin, Level::High)?.enter()?;
let sources = adxl345.get_interrupt_source()?;
```

Reading the interrupt source register clears the interrupt. If you forget to do
this INT1 stays high and the ESP32 wakes straight back up. The register is
decoded with [`bitflags`](https://docs.rs/bitflags), so the log shows names like
`ACTIVITY` rather than a raw byte.

## What's Next

There are still a few projects on my list:

- WiFi with WPA Enterprise authentication
- The EC11 rotary encoder
- A battery management system so the ESP32 can run without mains power

The repository will keep growing as I learn more, so keep an eye on it.

---

## Resources

[esp32-rust-examples repo](https://github.com/bobbymannino/esp32-rust-examples)

[esp-idf-svc on docs.rs](https://docs.rs/esp-idf-svc)

[The Rust on ESP Book](https://docs.espressif.com/projects/rust/book/)

[ESP32 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf)
