const convertNumberToWord = require('..');

describe('verify number conversions', () => {
    it.concurrent('should handle non-numeric input', () => {
        expect(() => convertNumberToWord()).toThrow();
        expect(() => convertNumberToWord('1')).toThrow();
        expect(() => convertNumberToWord('test')).toThrow();
    });

    it.concurrent('should handle zero and below correctly', () => {
        expect(() => convertNumberToWord(0)).toThrow();
        expect(() => convertNumberToWord(-1)).toThrow();
    });
    
    it.concurrent('should handle numbers greater than 999', () => {
        expect(() => convertNumberToWord(1000)).toThrow();
    });

    it.concurrent.each`
        input | expected
        ${1}  | ${"One"}
        ${8}  | ${"Eight"}
        ${12} | ${"Twelve"}
        ${19} | ${"Nineteen"}
        ${20} | ${"Twenty"}
        ${35} | ${"Thirty Five"}
        ${100} | ${"One Hundred"}
        ${111} | ${"One Hundred and Eleven"}
        ${205} | ${"Two Hundred and Five"}
        ${250} | ${"Two Hundred and Fifty"}
        ${500} | ${"Five Hundred"}
        ${519} | ${"Five Hundred and Nineteen"}
        ${555} | ${"Five Hundred and Fifty Five"}
        ${567} | ${"Five Hundred and Sixty Seven"}
        ${998} | ${"Nine Hundred and Ninety Eight"}
        ${999} | ${"Nine Hundred and Ninety Nine"}
    `("should accept $input and return $expected", ({ input, expected }) => {
        expect(convertNumberToWord(input)).toBe(expected);
    });
});
