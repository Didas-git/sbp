# SBP (Simple Binary Protocol)

SBP as the name implies is a super simple to use an parse binary format.

The main compromises it makes are:
- Simple to implement.
- Fast to parse.

## Protocol Description

SBP is essentially a serialization protocol that seeks to provide a standardized way of encoding and decoding data in a fast form across multiple environments.

## The Spec

### Single Message Transmission (HTTP)

For protocols that send the payload all at once we can reduce the bandwidth and memory costs by just not having a length present and only having the necessary data.

|                                         Version & Structure Type                                         | Optional identifier (Know structure only) |   Type   |      Data       |
| :------------------------------------------------------------------------------------------------------: | :---------------------------------------: | :------: | :-------------: |
| `1 byte`<br><br>Where:<br>First 4 bits represent the version<br>Last 4 bits represent the structure type |                 `1 byte`                  | `1 byte` | Everything else |

### Chunked Transmission (TCP)

For transmission protocols that might send data chunked into pieces like it is the case for TCP the protocol adds 2 bytes of `length` information after the identifier (if it exists).

|                                         Version & Structure Type                                         | Optional identifier (Know structure only) |  Length   |   Type   |        Data        |
| :------------------------------------------------------------------------------------------------------: | :---------------------------------------: | :-------: | :------: | :----------------: |
| `1 byte`<br><br>Where:<br>First 4 bits represent the version<br>Last 4 bits represent the structure type |                 `1 byte`                  | `2 bytes` | `1 byte` | `Length - 1 bytes` |
 

## Structure Types

Currently the spec only has 2 structure types:

- `Unknown` (`0x00`) - The data is sent with full type information and is up for the receiving end to properly parse the data.
- `Known` (`0x01`) - The data is sent with the assumption you have a schema for the data with for the given identifier.


## Data Types

> [!NOTE]
> All numeric data types are arranged in LE.

### Basic Types

|   Type    | Aliases                                     | Identification Hex Byte | Details                                                                                                            |
| :-------: | ------------------------------------------- | :---------------------: | ------------------------------------------------------------------------------------------------------------------ |
|  `null`   | `void`                                      |         `0x00`          | Always `0` (The value is optional, parsers can use the type to infer `null`)                                       |
|  `bool`   | `boolean`                                   |         `0x01`          | [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type) (either `0` or `1`)                                     |
|   `f16`   | `float16`, `binary16`                       |         `0x11`          | [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)                                                                 |
|   `f32`   | `float32`, `float`, `binary32`, `decimal32` |         `0x12`          | [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)                                                                 |
|   `f64`   | `float64`, `binary64`, `decimal64`          |         `0x13`          | [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)                                                                 |
|   `u8`    | `uint8`, `byte`, `octet`                    |         `0x21`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `u16`   | `uint16`, `ushort`                          |         `0x22`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `u32`   | `uint32`, `uint`                            |         `0x23`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `u64`   | `uint64`, `ulong`                           |         `0x24`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|  `u128`   | `uint128`, `ucent`                          |         `0x25`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types) (Encoded as string) |
|   `i8`    | `int8`, `sbyte`                             |         `0x31`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `i16`   | `int16`, `short`, `small_int`               |         `0x32`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `i32`   | `int32`, `int`                              |         `0x33`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|   `i64`   | `int64`, `long`                             |         `0x34`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types)                     |
|  `i128`   | `int128`, `cent`                            |         `0x35`          | [Integer](https://en.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types) (Encoded as string) |
| `char(n)` | `character(n)`                              |         `0x40`          | [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoded string of length `n` (max: $2^{64} − 1$)                      |
|   `str`   | `string`                                    |         `0x41`          | [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoded string of variable length                                     |
|  `bint`   | `bigint`                                    |         `0x70`          |                                                                                                                    |
|  `buint`  | `biguint`                                   |         `0x71`          |                                                                                                                    |

### Specialized Types

|  Type   | Aliases          | Identification Hex Byte | Details                                                                      |
| :-----: | ---------------- | :---------------------: | ---------------------------------------------------------------------------- |
| `date`  | `datestamp`      |         `0xA0`          | [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)                           |
| `time`  | `timestamp`      |         `0xA5`          | [Unix Time](https://en.wikipedia.org/wiki/Unix_time) in seconds (`i64`)      |
| `mtime` | `ms_timestamp`   |         `0xA6`          | [Unix Time](https://en.wikipedia.org/wiki/Unix_time) in milliseconds (`i64`) |
| `ntime` | `nano_timestamp` |         `0xA7`          | [Unix Time](https://en.wikipedia.org/wiki/Unix_time) in nanoseconds (`i128`) |

## Structures

Currently structures are defined in json.

> [!IMPORTANT]
> Formal definition coming soon...

To see the current definition check out the [typescript types](./js/src/schema-definition.ts).