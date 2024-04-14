export const enum ProtocolType {
    //#region Simple
    NULL = 0x00,
    BOOL = 0x01,
    F16 = 0x11,
    F32 = 0x12,
    F64 = 0x13,
    F80 = 0x14,
    F128 = 0x15,
    U8 = 0x20,
    U16 = 0x21,
    U32 = 0x22,
    U64 = 0x23,
    U128 = 0x24,
    I8 = 0x30,
    I16 = 0x31,
    I32 = 0x32,
    I64 = 0x33,
    I128 = 0x34,
    CHAR = 0x40,
    STR = 0x41,
    D32 = 0x51,
    D64 = 0x52,
    D128 = 0x53,
    BINT = 0x70,
    BUINT = 0x71,
    //#endregion
    //#region Specialized
    DATE = 0xA0,
    TIME = 0xA5,
    M_TIME = 0xA6,
    N_TIME = 0xA7
}
