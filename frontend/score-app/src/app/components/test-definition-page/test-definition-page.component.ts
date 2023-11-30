import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TestsService } from '../../services/tests.service';
import { ButtonModule } from 'primeng/button';
import { TestModel } from '../../models/test.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const PRIME_NG_MODULES = [InputTextModule, ButtonModule];

@UntilDestroy()
@Component({
  selector: 'app-test-definition-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PRIME_NG_MODULES],
  templateUrl: './test-definition-page.component.html',
  styleUrl: './test-definition-page.component.scss',
})
export class TestDefinitionPageComponent {
  form: FormGroup;

  get criteria(): FormArray<any> {
    return this.form?.get('criterias') as FormArray;
  }

  constructor(private fb: FormBuilder, private testsService: TestsService) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      criterias: this.fb.array([]),
    });
  }

  createCriteriaFormGroup() {
    return this.fb.group({
      question: ['', Validators.required],
      weight: [0, Validators.required],
      answers: this.fb.array([this.createAnswerFormGroup()]),
    });
  }

  createAnswerFormGroup() {
    return this.fb.group({
      text: ['', Validators.required],
      score: [0, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle the form data, e.g., send it to a server
      console.log(this.form.value);
    }
  }

  addCriteria() {
    (this.form.get('criterias') as FormArray).push(
      this.fb.array([this.createCriteriaFormGroup()])
    );
  }

  getCriterias() {
    return (this.form.get('criterias') as FormArray).controls;
  }
}
