export function addTrailingZeroes(num: number, digits: number): string {
    let str = num.toString();
    while (str.length < digits) {
        str = "0" + str;
    }
    return str;
}