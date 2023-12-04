import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { TestsService } from '../../services/tests.service';
import { TestModel } from '../../models/test.model';

@Component({
  selector: 'app-test-definition-page',
  templateUrl: './test-definition-page.component.html',
  styleUrls: ['./test-definition-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDefinitionPageComponent {
  form: FormGroup;
  showErrorMessage: boolean;
  readonly MAX_WEIGHT_ERROR =
    'The sum of all `weight` fields should not be grater than 1';

  sumValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const criterias = control.get('criterias') as FormArray;
    try {
      const sum = criterias.controls.reduce((acc, criteriaControl) => {
        const weightControl = criteriaControl.get('weight');
        return acc + (weightControl ? Number(weightControl.value) : 0);
      }, 0);

      return sum <= 1 ? null : { sumExceeded: true };
    } catch (e) {
      console.log(criterias);
      return null;
    }
  };

  get name() {
    return this.form.get('name') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  get criterias() {
    return this.form.get('criterias') as FormArray;
  }

  constructor(private fb: FormBuilder, private testsService: TestsService) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: [''],
        description: [''],
        criterias: this.fb.array([]),
      },
      { validators: this.sumValidator }
    );
  }

  buildCriteriaControls() {
    return new FormGroup({
      question: this.fb.control(''),
      weight: this.fb.control(''),
      answers: this.fb.array([]),
    });
  }

  buildAnswerControls() {
    return new FormGroup({
      text: this.fb.control(''),
      score: this.fb.control(''),
    });
  }

  addCriteria() {
    this.criterias.push(this.buildCriteriaControls());
  }

  addAnswer(index: number) {
    (this.criterias.at(index).get('answers') as FormArray).push(
      this.buildAnswerControls()
    );
  }

  criteriaAnswers(criteriaIndex: number): FormArray {
    return this.criterias.at(criteriaIndex).get('answers') as FormArray;
  }

  onSubmit() {
    if (this.form.hasError('sumExceeded')) {
      this.showErrorMessage = true;
      return;
    }

    this.testsService.saveNewTest({
      id: 'TEMP_ID',
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      criterias: this.form.get('criterias').value,
    } as TestModel);

    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.resetCriterias();
    this.showErrorMessage = false;
  }

  resetCriterias() {
    while (this.criterias.length !== 0) {
      const answers = this.criterias.get('answers') as FormArray;
      if (answers?.length) {
        while (answers.length !== 0) {
          answers.removeAt(0);
        }
      }
      this.criterias.removeAt(0);
    }
  }
}
