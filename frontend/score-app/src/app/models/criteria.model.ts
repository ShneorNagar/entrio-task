import { AnswerModel } from './answer.model';

export type CriteriaModel = {
  weight: number;
  question: string;
  answers: AnswerModel[];
};
