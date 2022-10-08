export const phoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{5,10}$/i;

export function isPhone(string: string): boolean {
    return phoneRegex.test(string);
}
