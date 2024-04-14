export type Schema = Record<string, SchemaField>;

export type SchemaField = NullField
    | BooleanField
    | FloatField
    | UIntField
    | IntegerField
    | CharField
    | StringField
    | BigIntField
    | BigUIntField
    | DateField
    | TimestampField
    | MillisecondsTimestampField
    | NanosecondsTimestampField;

export const enum SchemaType {
    //#region Simple
    NULL = "null",
    BOOL = "bool",
    FLOAT = "float",
    UINT = "uint",
    INT = "int",
    CHAR = "char",
    STRING = "str",
    DECIMAL = "dec",
    BIGINT = "bint",
    BIGUINT = "buint",
    //#endregion
    //#region Specialized
    DATE = "date",
    TIME = "time",
    M_TIME = "mtime",
    N_TIME = "ntime"
}

interface BaseField {
    type: SchemaType;
}

export interface NullField extends BaseField {
    type: SchemaType.NULL;
}

export interface BooleanField extends BaseField {
    type: SchemaType.BOOL;
}

export interface FloatField extends BaseField {
    type: SchemaType.FLOAT;
    size: 16 | 32 | 64 | 80 | 128;
}

export type IntegerSize = 8 | 16 | 32 | 64 | 128;

export interface UIntField extends BaseField {
    type: SchemaType.UINT;
    size: IntegerSize;
}

export interface IntegerField extends BaseField {
    type: SchemaType.INT;
    size: IntegerSize;
}

export interface CharField extends BaseField {
    type: SchemaType.CHAR;
    size: number | bigint;
}

export interface StringField extends BaseField {
    type: SchemaType.STRING;
}

export interface DecimalField extends BaseField {
    type: SchemaType.DECIMAL;
    size: 32 | 64 | 128;
}

export interface BigIntField extends BaseField {
    type: SchemaType.BIGINT;
}

export interface BigUIntField extends BaseField {
    type: SchemaType.BIGUINT;
}

export interface DateField extends BaseField {
    type: SchemaType.DATE;
}

export interface TimestampField extends BaseField {
    type: SchemaType.TIME;
}

export interface MillisecondsTimestampField extends BaseField {
    type: SchemaType.M_TIME;
}
export interface NanosecondsTimestampField extends BaseField {
    type: SchemaType.N_TIME;
}
