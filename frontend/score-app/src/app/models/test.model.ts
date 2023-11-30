import { CriteriaModel } from './criteria.model';

export type TestModel = {
  name: string;
  description: string;
  criterias: CriteriaModel[];
};
