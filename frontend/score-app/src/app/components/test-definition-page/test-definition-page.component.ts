import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TestsService } from '../../services/tests.service';
import { ButtonModule } from 'primeng/button';
import { TestModel } from '../../models/test.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-test-definition-page',
  templateUrl: './test-definition-page.component.html',
  styleUrls: ['./test-definition-page.component.scss'],
})
export class TestDefinitionPageComponent {
  form: FormGroup;
  
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
    this.form = this.fb.group({
      name: [''],
      description: [''],
      criterias: this.fb.array([this.buildCriteriaControls()]),
    });
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
    console.log(this.form.value);
    this.testsService.saveNewTest({
      id: 'TEMP_ID',
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      criterias: this.form.get('criterias').value,
    } as TestModel);
  }
}
