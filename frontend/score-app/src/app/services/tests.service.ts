import { Injectable } from '@angular/core';
import { TestModel } from '../models/test.model';
import { BehaviorSubject } from 'rxjs';

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

  private _tests$ = new BehaviorSubject<TestModel[]>(this.TESTS);

  get tests() {
    return this._tests$.asObservable();
  }
}
