import { TestCase } from './testCase';
export declare class TestCaseCollection {
    private testCases;
    constructor(testCases: TestCase[]);
    test: () => void;
}
