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
      name: 'test1',
      description: 'description1',
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
          ],
        },
        {
          question: 'question2',
          weight: 0.5,
          answers: [
            {
              text: 'answer1',
              score: 1,
            }
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
      companyName: 'company 1',
      finalScore: 3.5,
      scoreSeverity: 'success',
      answers: [123],
      test: {
        id: '1',
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
    },
    {
      id: '2',
      companyName: 'company 2',
      finalScore: 1.3,
      scoreSeverity: 'warning',
      answers: [12],
      test: {
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
}
