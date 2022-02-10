/**
 * @param {string} s
 * @return {string}
 */
 var decodeString = function (s) {
    let result = '';
    let times = [];
    let chars = [];
    let num = 0;
    for (c of s) {
        if (!isNaN(c)) {
            num = 10 * num + c * 1
        } else if (c === '[') {
            times.push(num);
            chars.push(result);
            result = '';
            num = 0;
        } else if (c === ']') {
            result = chars.pop() + result.repeat(times.pop())
        } else {
            result += c;
        }
    }
    return result
};