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
        case ProtocolType.NULL: {
            break;
        }
        case ProtocolType.BOOL: {
            return { version, type: "bool", payload: dv.getUint8(2) === 1 };
        }
        case ProtocolType.F64: {
            return { version, type: "f64", payload: dv.getFloat64(2, true) };
        }
        case ProtocolType.I64: {
            return { version, type: "i64", payload: dv.getBigInt64(2, true) };
        }
        case ProtocolType.STR: {
            const payload: Array<string> = [];

            for (let i = 2, length = data.byteLength; i < length; i++) payload.push(String.fromCharCode(dv.getUint8(i)));

            return { version, type: "str", payload: payload.join("") };
        }
        case ProtocolType.BINT: {
            let str = "";

            for (let i = 2, length = data.byteLength; i < length; i++) str += String.fromCharCode(dv.getUint8(i));
            return { version, type: "bigint", payload: BigInt(str) };
        }
        case ProtocolType.F16: { throw new Error("Not implemented yet: ProtocolType.F16 case"); }
        case ProtocolType.F32: { throw new Error("Not implemented yet: ProtocolType.F32 case"); }
        case ProtocolType.U8: { throw new Error("Not implemented yet: ProtocolType.U8 case"); }
        case ProtocolType.U16: { throw new Error("Not implemented yet: ProtocolType.U16 case"); }
        case ProtocolType.U32: { throw new Error("Not implemented yet: ProtocolType.U32 case"); }
        case ProtocolType.U64: { throw new Error("Not implemented yet: ProtocolType.U64 case"); }
        case ProtocolType.U128: { throw new Error("Not implemented yet: ProtocolType.U128 case"); }
        case ProtocolType.I8: { throw new Error("Not implemented yet: ProtocolType.I8 case"); }
        case ProtocolType.I16: { throw new Error("Not implemented yet: ProtocolType.I16 case"); }
        case ProtocolType.I32: { throw new Error("Not implemented yet: ProtocolType.I32 case"); }
        case ProtocolType.I128: { throw new Error("Not implemented yet: ProtocolType.I128 case"); }
        case ProtocolType.CHAR: { throw new Error("Not implemented yet: ProtocolType.CHAR case"); }
        case ProtocolType.BUINT: { throw new Error("Not implemented yet: ProtocolType.BUINT case"); }
        case ProtocolType.DATE: { throw new Error("Not implemented yet: ProtocolType.DATE case"); }
        case ProtocolType.TIME: { throw new Error("Not implemented yet: ProtocolType.TIME case"); }
        case ProtocolType.M_TIME: { throw new Error("Not implemented yet: ProtocolType.M_TIME case"); }
        case ProtocolType.N_TIME: { throw new Error("Not implemented yet: ProtocolType.N_TIME case"); }
    }

    return { version, type: "null", payload: null };
}
