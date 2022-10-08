export function withLeadingZero(num: number, targetLength = 2) {
    return num.toString().padStart(targetLength, '0');
}
