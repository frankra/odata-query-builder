"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseCollection = void 0;
var TestCaseCollection = /** @class */ (function () {
    function TestCaseCollection(testCases) {
        var _this = this;
        this.testCases = testCases;
        this.test = function () {
            return _this.testCases.forEach(function (tc) { return expect(tc.expected).toBe(tc.actual); });
        };
    }
    return TestCaseCollection;
}());
exports.TestCaseCollection = TestCaseCollection;
//# sourceMappingURL=testCaseCollection.js.map