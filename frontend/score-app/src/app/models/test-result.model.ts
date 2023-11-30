import { TestModel } from "./test.model";

export type TestScoreSeverity = 'danger' | 'warning' | 'info' | 'success'

export type TestResult = {
    companyName: string;
    test: TestModel;
    answers: any[]; // todo merge with questions
    finalScore: number;
    scoreSeverity: TestScoreSeverity; // using in <p-tag> element of primeNg
}