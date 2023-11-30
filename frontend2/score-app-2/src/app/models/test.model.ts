import { CriteriaModel } from './criteria.model';

export type TestModel = {
  id: string;
  name: string;
  description: string;
  criterias: CriteriaModel[];
};
