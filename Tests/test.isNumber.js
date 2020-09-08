describe("isNumber", function () {
    it("-1 is a number", function () {
        expect(isNumber(-1)).to.equal(true);
    });
    
    it("0 is a number", function () {
        expect(isNumber(0)).to.equal(true);
    });
    
    it("0.5 is a number", function () {
        expect(isNumber(0.5)).to.equal(true);
    });

    it("1 is a number", function () {
        expect(isNumber(1)).to.equal(true);
    });

    it("NaN is not a number", function () {
        expect(isNumber(NaN)).to.equal(false);
    });

    it("null is not a number", function () {
        expect(isNumber(null)).to.equal(false);
    });

    it("undefined is not a number", function () {
        expect(isNumber(undefined)).to.equal(false);
    });
});
