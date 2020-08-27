"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryBuilder_1 = require("./queryBuilder");
var testing_1 = require("./testing");
describe('Query Builder', function () {
    it('should return an empty string when asked to build without options', function () {
        expect(new queryBuilder_1.QueryBuilder().toQuery()).toEqual('');
    });
    it('should return count', function () {
        expect(new queryBuilder_1.QueryBuilder().count().toQuery()).toEqual('?$count=true');
    });
    it('should return order by', function () {
        expect(new queryBuilder_1.QueryBuilder().orderBy('test').toQuery()).toEqual('?$orderby=test');
    });
    it('should only return the last order by', function () {
        expect(new queryBuilder_1.QueryBuilder().orderBy('old').orderBy('test').toQuery()).toEqual('?$orderby=test');
    });
    it('should return top', function () {
        expect(new queryBuilder_1.QueryBuilder().top(1).toQuery()).toEqual('?$top=1');
    });
    it('should only return the last top', function () {
        expect(new queryBuilder_1.QueryBuilder().top(5).top(1).toQuery()).toEqual('?$top=1');
    });
    it('should return skip', function () {
        expect(new queryBuilder_1.QueryBuilder().skip(1).toQuery()).toEqual('?$skip=1');
    });
    it('should only return the last skip', function () {
        expect(new queryBuilder_1.QueryBuilder().skip(5).skip(1).toQuery()).toEqual('?$skip=1');
    });
    it('should return expand', function () {
        expect(new queryBuilder_1.QueryBuilder().expand('test').toQuery()).toEqual('?$expand=test');
    });
    it('should only return the last expand at the root level', function () {
        expect(new queryBuilder_1.QueryBuilder().expand('old').expand('test').toQuery()).toEqual('?$expand=test');
    });
    it('should return select', function () {
        expect(new queryBuilder_1.QueryBuilder().select('test').toQuery()).toEqual('?$select=test');
    });
    it('should only return the last select at the root level', function () {
        expect(new queryBuilder_1.QueryBuilder().select('old').select('test').toQuery()).toEqual('?$select=test');
    });
    it('should add a new filter expression', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) { return f.filterExpression('testProp1', 'eq', 'testVal1'); })
                .toQuery(), '?$filter=testProp1 eq \'testVal1\''),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) { return f.filterExpression('testProp1', 'eq', 1); })
                .toQuery(), '?$filter=testProp1 eq 1'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) { return f.filterExpression('testProp1', 'eq', true); })
                .toQuery(), '?$filter=testProp1 eq true'),
        ]);
        testCases.test();
    });
    it('should add a new filter phrase', function () {
        expect(new queryBuilder_1.QueryBuilder()
            .filter(function (f) { return f.filterPhrase('contains(\'test\')'); })
            .toQuery()).toEqual('?$filter=contains(\'test\')');
    });
    it('should add multiple filters (should default to and)', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterExpression('testProp2', 'eq', 'testVal2');
            })
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and testProp2 eq \'testVal2\''),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterPhrase('contains(\'test1\')')
                    .filterPhrase('contains(\'test2\')');
            })
                .toQuery(), '?$filter=contains(\'test1\') and contains(\'test2\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterPhrase('contains(\'test\')');
            })
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and contains(\'test\')')
        ]);
        testCases.test();
    });
    it('should add multiple \'and\' filters', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterExpression('testProp2', 'eq', 'testVal2');
            }, 'and')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and testProp2 eq \'testVal2\''),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterPhrase('contains(\'test1\')')
                    .filterPhrase('contains(\'test2\')');
            }, 'and')
                .toQuery(), '?$filter=contains(\'test1\') and contains(\'test2\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterPhrase('contains(\'test\')');
            }, 'and')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and contains(\'test\')')
        ]);
        testCases.test();
    });
    it('should add multiple \'or\' filters', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterExpression('testProp2', 'eq', 'testVal2');
            }, 'or')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' or testProp2 eq \'testVal2\''),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterPhrase('contains(\'test1\')')
                    .filterPhrase('contains(\'test2\')');
            }, 'or')
                .toQuery(), '?$filter=contains(\'test1\') or contains(\'test2\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f) {
                return f
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .filterPhrase('contains(\'test\')');
            }, 'or')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' or contains(\'test\')')
        ]);
        testCases.test();
    });
    it('should add nested \'or\' filters', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .or(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            })
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and (testProp2 eq \'testVal2\' or testProp3 eq \'testVal3\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .or(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            }, 'and')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and (testProp2 eq \'testVal2\' or testProp3 eq \'testVal3\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .or(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            }, 'or')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' or (testProp2 eq \'testVal2\' or testProp3 eq \'testVal3\')')
        ]);
        testCases.test();
    });
    it('should add nested \'and\' filters', function () {
        var testCases = new testing_1.TestCaseCollection([
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .and(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            })
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and (testProp2 eq \'testVal2\' and testProp3 eq \'testVal3\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .and(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            }, 'and')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' and (testProp2 eq \'testVal2\' and testProp3 eq \'testVal3\')'),
            new testing_1.TestCase(new queryBuilder_1.QueryBuilder()
                .filter(function (f1) {
                return f1
                    .filterExpression('testProp1', 'eq', 'testVal1')
                    .and(function (f2) {
                    return f2
                        .filterExpression('testProp2', 'eq', 'testVal2')
                        .filterExpression('testProp3', 'eq', 'testVal3');
                });
            }, 'or')
                .toQuery(), '?$filter=testProp1 eq \'testVal1\' or (testProp2 eq \'testVal2\' and testProp3 eq \'testVal3\')')
        ]);
        testCases.test();
    });
});
//# sourceMappingURL=queryBuilder.spec.js.map