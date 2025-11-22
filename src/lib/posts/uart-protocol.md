---
title: "UART Protocol"
tagline: "What is the UART protocol?"
publishedOn: 2025-11-22
tags: ["protocols"]
thumbnailSrc: "uart.png"
thumbnailAlt: "UART Protocol"
---

# UART Protocol

## What is the UART Protocol?

The UART protocol is a serial communication protocol that allows data to be
transmitted between two devices over 1 or 2 wires. It is commonly used in
embedded systems and microcontrollers.

The way it works is by sending a start bit, followed by 8 data bits, and then
a stop bit. The start bit is a low signal that indicates the beginning of a
data frame. The data bits are the actual data being transmitted. The stop bit
is a high signal that indicates the end of a data frame.

The line at idle is left high so that it is easier to detect a faulty
wire/connection.

More modern protocols like SPI and I2C are also commonly used in embedded
systems, both with their advantages and disadvantages. UART is a more simple
protocol that takes less wires and is easier to implement but has its drawbacks
like both devices must already be configured with the same baud rate.

## Duplexes

There are 3 types of duplexes which dictate the direction and timing of data
transfer between 2 devices.

- Simplex: Data only travels from one transmitter to one receiver.
- Half-duplex: Data can travel in both directions but not simultaneously.
- Full-duplex: Data can travel in both directions simultaneously.
