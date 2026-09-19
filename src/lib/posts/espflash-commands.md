---
title: "espflash Commands"
publishedOn: 2026-09-19
tagline: "Using espflash to read and write persistant storage"
tags: ["esp32", "hardware", "cli"]
---

# `espflash` Commands

## What is `espflash`

`espflash` is a command provided by the `esptool` package. It is used to flash
firmware onto ESP32 microcontrollers but also to read and write the nonvolatile
storage (NVS) of the ESP.

In this blog post I will be focusing on using `espflash` in the CLI to read and
write the NVS.

All commands require the ESP device to be plugged into the computer. In my
experience, when using a USB-3 cable/port the reliability is mediocre, but when
using a USB-2 hub the reliability is much better.

## Connecting to a Device

By default, `espflash` looks for a connected device and uses it automatically.
If it cannot find the device, or if multiple devices are connected, you can find
the serial port yourself and pass it to `espflash`.

You can first ask `espflash` to list the serial ports it can detect on any
operating system:

```sh
espflash list-ports
```

You can also find the port using your operating system. Run the relevant command
before and after plugging in the ESP; the new entry is usually the device.

### macOS

```sh
ls /dev/cu.*
```

The device is commonly named `/dev/cu.usbserial-*` or `/dev/cu.usbmodem*`.

### Linux

```sh
ls /dev/ttyUSB* /dev/ttyACM*
```

The device is commonly named `/dev/ttyUSB0` or `/dev/ttyACM0`. If the port is
visible but cannot be opened, your user may need permission to access the serial
port.

### Windows

In PowerShell, list the available COM ports with:

```powershell
[System.IO.Ports.SerialPort]::GetPortNames()
```

You can also open Device Manager and look under **Ports (COM & LPT)**. The port
will have a name such as `COM3`.

## `board-info`

Use this command to see information about the connected device such as flash
size, CPU speed, features, and more. Once you know the serial port, select it
with the `--port` option:

```sh
espflash board-info --port <SERIAL_PORT>
```

For example, use the device path on macOS or Linux:

```sh
espflash board-info --port /dev/cu.usbmodem1101
espflash board-info --port /dev/ttyUSB0
```

On Windows, use the COM port name:

```powershell
espflash board-info --port COM3
```

If only one supported device is connected, you can let `espflash` select it:

```sh
espflash board-info
```

An example output from this command would be:

```sh
$ espflash board-info
[2026-09-19T08:20:55Z INFO ] Serial port: '/dev/cu.usbserial-2130'
[2026-09-19T08:20:55Z INFO ] Connecting...
[2026-09-19T08:21:01Z INFO ] Using flash stub
Chip type:         esp32 (revision v3.0)
Crystal frequency: 40 MHz
Flash size:        4MB
Features:          WiFi, BT, Dual Core, 240MHz, VRef calibration in efuse, Coding Scheme None
MAC address:       c8:f0:9e:50:8a:d0
Security features: None
```

## Reading the Partition Table

Before reading or writing a partition, find its address and size in the device's
partition table. ESP-IDF stores the table at `0x8000` by default, and it
occupies one `0x1000`-byte flash sector. [Read](#read-flash) that sector into a
local file with:

```sh
espflash read-flash 0x8000 0x1000 partition-table.bin
```

If needed, select the device with `--port`:

```sh
espflash read-flash --port /dev/cu.usbmodem1101 0x8000 0x1000 partition-table.bin
```

Then use `partition-table` to display the binary file in a readable table:

```sh
espflash partition-table partition-table.bin
```

Each row shows a partition's name, type, subtype, offset, and size. Find the row
named `nvs` and use its offset and size with `read-flash`. For example, an NVS
row with an offset of `0x9000` and a size of `0x6000` describes the flash region
from `0x9000` through `0xEFFF`.

You can also convert the partition table to CSV:

```sh
espflash partition-table partition-table.bin --to-csv --output partition-table.csv
```

The partition table offset can be changed in the firmware's ESP-IDF
configuration. If the default `0x8000` address does not contain a valid table,
check the firmware configuration for `CONFIG_PARTITION_TABLE_OFFSET`.

An example output from the `espflash partition-table partition-table.bin` would
be:

```sh
$ esp-alarm-clock git:(feat/gui) ✗ espflash partition-table pt.bin
╭──────────┬──────┬─────────┬─────────┬────────────────────┬───────────╮
│ Name     ┆ Type ┆ SubType ┆ Offset  ┆ Size               ┆ Encrypted │
╞══════════╪══════╪═════════╪═════════╪════════════════════╪═══════════╡
│ nvs      ┆ data ┆ nvs     ┆ 0x9000  ┆ 0x6000 (24KiB)     ┆           │
├╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌┤
│ phy_init ┆ data ┆ phy     ┆ 0xf000  ┆ 0x1000 (4KiB)      ┆           │
├╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┼╌╌╌╌╌╌╌╌╌╌╌┤
│ factory  ┆ app  ┆ factory ┆ 0x10000 ┆ 0x3f0000 (4032KiB) ┆           │
╰──────────┴──────┴─────────┴─────────┴────────────────────┴───────────╯
```

## `read-flash`

Use this command to copy a region of flash memory from the ESP to a local binary
file. It requires the start address, the number of bytes to read, and the output
file:

```text
espflash read-flash <ADDRESS> <SIZE> <FILE>
```

Addresses and sizes can be written in hexadecimal. For example, if the device's
partition table shows that NVS starts at `0x9000` and has a size of `0x6000`,
read the entire partition with:

```sh
espflash read-flash 0x9000 0x6000 nvs.bin
```

The resulting `nvs.bin` is a byte-for-byte copy of that flash region and can
also be kept as a backup before making changes.

### Viewing NVS

NVS is a binary format, so printing `nvs.bin` with `cat` will produce unreadable
output and may write control characters to the terminal. On macOS or Linux, use
`hexdump` to display each byte alongside its printable ASCII representation:

```sh
hexdump -C nvs.bin
```

The first column is the offset within `nvs.bin`, the middle columns contain the
bytes in hexadecimal, and the final column shows printable text. Pipe the output
to `less` when the file is too large to fit on one screen:

```sh
hexdump -C nvs.bin | less
```

To show only readable text found in the partition, use:

```sh
strings nvs.bin
```

On Windows, PowerShell provides a similar hexadecimal view:

```powershell
Format-Hex -Path .\nvs.bin
```

These commands display the raw partition and can reveal keys and string values,
but they do not fully decode NVS entries. Integers, blobs, metadata, deleted
entries, and encrypted NVS data will still appear as binary.

## `write-bin`

Use this command to write a local binary file to a specific flash address. It
requires the destination address and the file to write:

```text
espflash write-bin <ADDRESS> <FILE>
```

To write `nvs.bin` back to an NVS partition beginning at `0x9000`, run:

```sh
espflash write-bin 0x9000 nvs.bin
```

Writing to the wrong address can corrupt the partition table, application, or
other device data. Always confirm the partition's address and size for the
specific firmware, and make sure the binary fits within that partition before
writing it.

It is also a good idea to backup the NVS before writing.
