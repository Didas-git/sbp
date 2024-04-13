export const enum ProtocolType {
    //#region Simple
    NULL = 0x00,
    BOOL = 0x01,
    F16 = 0x11,
    F32 = 0x12,
    F64 = 0x13,
    U8 = 0x21,
    U16 = 0x22,
    U32 = 0x23,
    U64 = 0x24,
    U128 = 0x25,
    I8 = 0x31,
    I16 = 0x32,
    I32 = 0x33,
    I64 = 0x34,
    I128 = 0x35,
    CHAR = 0x40,
    STR = 0x41,
    BINT = 0x70,
    BUINT = 0x71,
    //#endregion
    //#region Specialized
    DATE = 0xA0,
    TIME = 0xA5,
    M_TIME = 0xA6,
    N_TIME = 0xA7
}
