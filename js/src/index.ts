import * as SBP from "./sbp.js";

const str1 = SBP.HTTP.encodeUnknown("some string");
const str2 = SBP.HTTP.encodeUnknown("some string that si really long and is supposed to resize the buffer because its longer than 100 bytes, hope it works!");
const nul = SBP.HTTP.encodeUnknown(null);
const undef = SBP.HTTP.encodeUnknown(undefined);
const bool = SBP.HTTP.encodeUnknown(true);
const num = SBP.HTTP.encodeUnknown(Number.MAX_SAFE_INTEGER);
const bigint1 = SBP.HTTP.encodeUnknown(SBP.MAX_BIGINT64);
const bigint2 = SBP.HTTP.encodeUnknown(SBP.MAX_BIGINT64 + 1n);
// Only uncomment this to test, its so fck big it takes a while
// const bigint3 = SBP.encodeUnknown(1n << (1n << 30n - 1n));

console.log("ENCODING AND DECODING UNKNOWN STRUCTURE:");
console.log(str1);
console.log(SBP.decodeToJSON(str1));
console.log(str2);
console.log(SBP.decodeToJSON(str2));
console.log(nul);
console.log(SBP.decodeToJSON(nul));
console.log(undef);
console.log(SBP.decodeToJSON(undef));
console.log(bool);
console.log(SBP.decodeToJSON(bool));
console.log(num);
console.log(SBP.decodeToJSON(num));
console.log(bigint1);
console.log(SBP.decodeToJSON(bigint1));
console.log(bigint2);
console.log(SBP.decodeToJSON(bigint2));
// console.log(bigint3);
// console.log(SBP.decodeToJSON(bigint3));
