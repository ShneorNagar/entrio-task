import { Injectable } from '@angular/core';
import { TestModel } from '../models/test.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { TestResult } from '../models/test-result.model';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  readonly TESTS: TestModel[] = [
    {
      id: '1',
      name: 'EntrioTest',
      description: 'home assignment',
      criterias: [
        {
          question: 'company size',
          weight: 0.3,
          answers: [
            {
              text: '1-10',
              score: 1,
            },
            {
              text: '11-100',
              score: 2,
            },
            {
              text: '101-1000',
              score: 3,
            },
            {
              text: '1001 and up',
              score: 4,
            },
          ],
        },
        {
          question: 'Company Funding',
          weight: 0.4,
          answers: [
            {
              text: 'up to 1 M',
              score: 1,
            },
            {
              text: '1M-10M',
              score: 2,
            },
            {
              text: '10M - 100M',
              score: 3,
            },
            {
              text: '100M and up',
              score: 4,
            },
          ],
        },
        {
          question: 'Company Age',
          weight: 0.2,
          answers: [
            {
              text: 'Up to 1 year',
              score: 1,
            },
            {
              text: '1-5 years',
              score: 2,
            },
            {
              text: '5-12 years',
              score: 3,
            },
            {
              text: '12 years or more',
              score: 4,
            },
          ],
        },
        {
          question: 'Leadership Experience',
          weight: 0.1,
          answers: [
            {
              text: 'No experience',
              score: 1,
            },
            {
              text: 'Short Experience',
              score: 2,
            },
            {
              text: 'Medium Experience',
              score: 3,
            },
            {
              text: 'Long Experience',
              score: 4,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'test2',
      description: 'description2',
      criterias: [
        {
          question: 'question1',
          weight: 0.3,
          answers: [
            {
              text: 'answer1',
              score: 1,
            },
            {
              text: 'answer4',
              score: 4,
            },
          ],
        },
        {
          question: 'question2',
          weight: 0.3,
          answers: [
            {
              text: 'answer1',
              score: 1,
            },
            {
              text: 'answer2',
              score: 2,
            },
            {
              text: 'answer3',
              score: 3,
            },
            {
              text: 'answer4',
              score: 4,
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'test3',
      description: 'description3',
      criterias: [
        {
          question: 'question1',
          weight: 0.3,
          answers: [
            {
              text: 'answer1',
              score: 1,
            },
            {
              text: 'answer2',
              score: 2,
            },
            {
              text: 'answer3',
              score: 3,
            },
            {
              text: 'answer4',
              score: 4,
            },
          ],
        },
      ],
    },
  ];

  readonly TESTS_RESULTS: TestResult[] = [
    {
      id: '1',
      companyName: 'Entrio',
      finalScore: 4,
      scoreSeverity: 'success',
      tests: [
        {
          id: '1',
          name: 'EntrioTest',
          description: 'home assignment',
          criterias: [
            {
              question: 'company size',
              weight: 0.3,
              answers: [
                {
                  text: '1-10',
                  score: 1,
                  isSelected: false,
                },
                {
                  text: '11-100',
                  score: 2,
                  isSelected: false,
                },
                {
                  text: '101-1000',
                  score: 3,
                  isSelected: false,
                },
                {
                  text: '1001 and up',
                  score: 4,
                  isSelected: true,
                },
              ],
            },
            {
              question: 'Company Funding',
              weight: 0.4,
              answers: [
                {
                  text: 'up to 1 M',
                  score: 1,
                  isSelected: false,
                },
                {
                  text: '1M-10M',
                  score: 2,
                  isSelected: false,
                },
                {
                  text: '10M - 100M',
                  score: 3,
                  isSelected: false,
                },
                {
                  text: '100M and up',
                  score: 4,
                  isSelected: true,
                },
              ],
            },
            {
              question: 'Company Age',
              weight: 0.2,
              answers: [
                {
                  text: 'Up to 1 year',
                  score: 1,
                  isSelected: false,
                },
                {
                  text: '1-5 years',
                  score: 2,
                  isSelected: false,
                },
                {
                  text: '5-12 years',
                  score: 3,
                  isSelected: false,
                },
                {
                  text: '12 years or more',
                  score: 4,
                  isSelected: true,
                },
              ],
            },
            {
              question: 'Leadership Experience',
              weight: 0.1,
              answers: [
                {
                  text: 'No experience',
                  score: 1,
                  isSelected: false,
                },
                {
                  text: 'Short Experience',
                  score: 2,
                  isSelected: false,
                },
                {
                  text: 'Medium Experience',
                  score: 3,
                  isSelected: false,
                },
                {
                  text: 'Long Experience',
                  score: 4,
                  isSelected: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      companyName: 'company 2',
      finalScore: 1.3,
      scoreSeverity: 'warning',
      tests: [
        {
          id: '2',
          name: 't1',
          description: 'd1',
          criterias: [
            {
              question: 'question1',
              weight: 0.3,
              answers: [
                {
                  text: 'answer1',
                  score: 1,
                },
                {
                  text: 'answer2',
                  score: 2,
                },
                {
                  text: 'answer3',
                  score: 3,
                },
                {
                  text: 'answer4',
                  score: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  private _tests$ = new BehaviorSubject<TestModel[]>(this.TESTS);
  private _selectedTestResult$ = new Subject<TestResult>();
  private _testsResults$ = new BehaviorSubject<TestResult[]>(
    this.TESTS_RESULTS
  );

  get tests$() {
    return this._tests$.asObservable();
  }

  get testsResults$() {
    return this._testsResults$.asObservable();
  }

  get selectedTestResult$() {
    return this._selectedTestResult$.asObservable();
  }

  set selectedTestResult(test: TestResult) {
    this._selectedTestResult$.next(test);
  }

  // todo send to backend
  saveNewTest(test: TestModel) {
    console.log('test saved. data: ', test);
  }

  // todo send to backend
  saveNewTestResult(testResult: TestResult) {
    console.log('test saved. data: ', testResult);
  }
}
