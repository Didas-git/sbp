import { ProtocolType } from "./protocol-types.js";
import * as SBP from "./sbp.js";

/**
 * This encoder makes some assumptions and is not as memory efficient as en coding with a schema/known structure
 *
 * How it transforms javascript types:
 *
 * `string` -> `str`
 *
 * `number` -> `f64`
 *
 * `boolean` -> `bool`
 *
 * `bigint` -> >MAX_BIGINT64 ? `bigint` : `i64`
 *
 * `undefined`, `null` -> `null`
 *
 * `object` -> Throws since the protocol doesn't yet support objects
 *
 * `function` -> Throws
 *
 * `symbol` -> Throws
 */
export function encodeUnknown(data: unknown): ArrayBuffer {
    const buffer = new ArrayBuffer(102, { maxByteLength: 2 ** 32 });
    const dv = new DataView(buffer);
    let cursor = 1;

    dv.setUint8(0, SBP.VERSION << 4);

    if (data == null) {
        dv.setUint8(cursor++, ProtocolType.NULL);
        dv.setUint8(cursor++, 0);
    } else if (typeof data === "string") {
        dv.setUint8(cursor++, ProtocolType.STR);

        const str_length = data.length;

        if (str_length > buffer.byteLength - cursor) buffer.resize(str_length + cursor);
        for (let i = 0; i < str_length; i++) dv.setUint8(cursor++, data.charCodeAt(i));
    } else if (typeof data === "number") {
        dv.setUint8(cursor++, ProtocolType.F64);
        dv.setFloat64(cursor, data, true);
        cursor += 8;
    } else if (typeof data === "boolean") {
        dv.setUint8(cursor++, ProtocolType.BOOL);
        dv.setUint8(cursor++, data ? 1 : 0);
    } else if (typeof data === "bigint") {
        if (data > SBP.MAX_BIGINT64) {
            dv.setUint8(cursor++, ProtocolType.BINT);
            const str = data.toString();
            const str_length = str.length;

            if (str_length > buffer.byteLength - cursor) buffer.resize(str_length + cursor);
            for (let i = 0; i < str_length; i++) dv.setUint8(cursor++, str.charCodeAt(i));
        } else {
            dv.setUint8(cursor++, ProtocolType.I64);
            dv.setBigInt64(cursor, data, true);
            cursor += 8;
        }
    } else if (typeof data === "function" || typeof data === "symbol" || typeof data === "object") throw new Error("Unsupported data type");
    else throw Error("Something unexpected happened");

    return buffer.slice(0, cursor);
}
