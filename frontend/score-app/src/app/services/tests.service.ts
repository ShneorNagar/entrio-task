import { Injectable } from '@angular/core';
import { TestModel } from '../models/test.model';
import { BehaviorSubject } from 'rxjs';
import { TestResult } from '../models/test-result.model';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  readonly TESTS: TestModel[] = [
    {
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
    },{
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
      companyName: 'company 1',
      finalScore: 3.5,
      answers: [123],
      test: {
        name: 't1',
        description:'d1',
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
      }
    },
    {
      companyName: 'company 2',
      finalScore: 3,
      answers: [12],
      test: {
        name: 't1',
        description:'d1',
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
      }
    }
  ]

  private _tests$ = new BehaviorSubject<TestModel[]>(this.TESTS);
  private _testsResults$ = new BehaviorSubject<TestResult[]>(this.TESTS_RESULTS);

  get tests() {
    return this._tests$.asObservable();
  }

  get testsResults() {
    return this._testsResults$.asObservable();
  }
}
