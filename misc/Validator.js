export function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function isLenghtMatches(text, min = 0, max = min + 1) {
    return text.length >= min && text.length <= max;
}

export function isSentence(entry) {
    return entry.split(/\b\W+\b/).length > 1;
}