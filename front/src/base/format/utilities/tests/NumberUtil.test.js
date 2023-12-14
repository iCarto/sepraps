import NumberUtil from "../NumberUtil";

describe("NumberUtil methods", () => {
    describe("formatMillions", () => {
        const testingValue = 666600000;
        const oneMillion = 1000000;
        const resultWithSymbol = NumberUtil.formatMillions(testingValue);
        const resultWithoutSymbol = NumberUtil.formatMillions(testingValue, false);

        test("returns a string when only one param is provided", () => {
            expect(typeof resultWithSymbol).toBe("string");
        });
        test("returned string ends with M when only one param is provided", () => {
            expect(resultWithSymbol.charAt(resultWithSymbol.length - 1)).toBe("M");
        });
        test("returns a number when second param is false", () => {
            expect(typeof resultWithoutSymbol).toBe("number");
        });
        test("divides value into one million", () => {
            expect(resultWithoutSymbol).toBe(testingValue / oneMillion);
        });
    });
});
