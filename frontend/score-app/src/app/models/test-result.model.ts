import { TestModel } from "./test.model";

export type TestResult = {
    companyName: string;
    test: TestModel;
    answers: any[]; // todo merge with questions
    finalScore: number
}