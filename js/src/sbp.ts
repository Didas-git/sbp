import { ProtocolType } from "./protocol-types.js";
import * as SBP_HTTP from "./http.js";
// eslint-disable-next-line @stylistic/no-mixed-operators
export const MAX_BIGINT64 = 2n ** (64n - 1n) - 1n;

export const HTTP = SBP_HTTP;
export const VERSION = 1;

export function decodeToJSON(data: ArrayBuffer, isTCP: boolean = false): { version: number, payload: any } & ({ identifier: number } | { type: string }) {
    const dv = new DataView(data);
    const first_byte = dv.getUint8(0);

    const version = first_byte >> 4;
    const struct_type = first_byte & 0xF;

    if (struct_type === 1) throw new Error("Parsing known structures is not yet supported");

    const data_type: ProtocolType = dv.getUint8(isTCP ? 3 : 1);

    switch (data_type) {
        case ProtocolType.NULL: { return { version, type: "null", payload: null }; }
        case ProtocolType.BOOL: { return { version, type: "bool", payload: dv.getUint8(2) === 1 }; }
        case ProtocolType.F16: { throw new Error("Float16 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.F32: { return { version, type: "f32", payload: dv.getFloat32(2, true) }; }
        case ProtocolType.F64: { return { version, type: "f64", payload: dv.getFloat64(2, true) }; }
        case ProtocolType.F80: { throw new Error("Float80 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.F128: { throw new Error("Float128 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.U8: { return { version, type: "u8", payload: dv.getUint8(2) }; }
        case ProtocolType.U16: { return { version, type: "u16", payload: dv.getUint16(2, true) }; }
        case ProtocolType.U32: { return { version, type: "u32", payload: dv.getUint32(2, true) }; }
        case ProtocolType.U64: { return { version, type: "u64", payload: dv.getBigUint64(2, true) }; }
        case ProtocolType.U128: { return { version, type: "u128", payload: BigInt(`${dv.getBigUint64(2, true)}${dv.getBigUint64(10, true)}`) }; }
        case ProtocolType.I8: { return { version, type: "i8", payload: dv.getInt8(2) }; }
        case ProtocolType.I16: { return { version, type: "i16", payload: dv.getInt16(2, true) }; }
        case ProtocolType.I32: { return { version, type: "i32", payload: dv.getInt32(2, true) }; }
        case ProtocolType.I64: { return { version, type: "i64", payload: dv.getBigInt64(2, true) }; }
        case ProtocolType.I128: { return { version, type: "i128", payload: BigInt(`${dv.getBigInt64(2, true)}${dv.getBigInt64(10, true)}`) }; }
        case ProtocolType.CHAR: {
            const payload: Array<string> = [];

            for (let i = 2, length = data.byteLength; i < length; i++) payload.push(String.fromCharCode(dv.getUint8(i)));

            return { version, type: "char", payload: payload.join("") };
        }
        case ProtocolType.STR: {
            const payload: Array<string> = [];

            for (let i = 2, length = data.byteLength; i < length; i++) payload.push(String.fromCharCode(dv.getUint8(i)));

            return { version, type: "str", payload: payload.join("") };
        }
        case ProtocolType.D32: { throw new Error("Decimal32 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.D64: { throw new Error("Decimal64 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.D128: { throw new Error("Decimal128 is not yet possible to decode in the javascript implementation"); }
        case ProtocolType.BINT: {
            let str = "";

            for (let i = 2, length = data.byteLength; i < length; i++) str += String.fromCharCode(dv.getUint8(i));
            return { version, type: "bigint", payload: BigInt(str) };
        }
        case ProtocolType.BUINT: {
            let str = "";

            for (let i = 2, length = data.byteLength; i < length; i++) str += String.fromCharCode(dv.getUint8(i));
            return { version, type: "biguint", payload: BigInt(str) };
        }
        case ProtocolType.DATE: {
            const payload: Array<string> = [];

            for (let i = 2, length = data.byteLength; i < length; i++) payload.push(String.fromCharCode(dv.getUint8(i)));

            return { version, type: "date", payload: new Date(payload.join("")) };
        }
        case ProtocolType.TIME: { return { version, type: "time", payload: dv.getBigInt64(2, true) }; }
        case ProtocolType.M_TIME: { return { version, type: "mtime", payload: dv.getBigInt64(2, true) }; }
        case ProtocolType.N_TIME: { return { version, type: "ntime", payload: BigInt(`${dv.getBigInt64(2, true)}${dv.getBigInt64(10, true)}`) }; }
    }
}
