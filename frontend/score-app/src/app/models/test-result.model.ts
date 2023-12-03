import { TestModel } from "./test.model";

export type TestScoreSeverity = 'danger' | 'warning' | 'info' | 'success'

export type TestResult = {
    id: string;
    companyName: string;
    tests: TestModel[];
    finalScore: number;
    scoreSeverity: TestScoreSeverity; // using in <p-tag> element of primeNg
}