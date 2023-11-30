import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult } from '../../models/test-result.model';
import { combineLatest, firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestModel } from 'src/app/models/test.model';
import { ListboxClickEvent } from 'primeng/listbox';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-test-result-page',
  templateUrl: './test-result-page.component.html',
  styleUrls: ['./test-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultPageComponent implements OnInit {
  currentTestResult: TestResult;
  tests: TestModel[];
  selectedTest: TestModel;
  isNewTest: boolean;
  form: FormGroup;

  get criterias() {
    return this.form.get('criterias') as FormArray;
  }

  constructor(
    private testsService: TestsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    combineLatest([
      this.testsService.testsResults$,
      this.testsService.tests$,
      this.route.queryParams,
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([testsResults, tests, params]) => {
        this.tests = tests;
        this.isNewTest = params['newTest'] || !Object.keys(params).length;
        if (!this.isNewTest) {
          this.currentTestResult = testsResults.find(
            (t) => t.id === params['id']
          );
        }
      });
  }

  onTestItemClick(event: DropdownChangeEvent) {
    this.selectedTest = this.tests.find((t) => t.name === event.value?.name);
    if (this.selectedTest) {
      this.buildTestForm();
    }
  }

  buildTestForm() {
    this.form = this.fb.group({
      criterias: this.fb.array(
        this.selectedTest.criterias.map((c) => {
          return this.fb.group({
            question: c.question,
            answers: this.fb.array(
              c.answers.map((a, i) => this.fb.group({
                ['text_' + i]: a.text,
                selectedAnswer: '', // Initially empty
              }))
            ),
          });
        })
      ),
    });
    console.log(this.form);
  }

  criteriaAnswers(criteriaIndex: number): FormArray {
    return this.criterias.at(criteriaIndex).get('answers') as FormArray;
  }

  onSubmit() {
    console.log(this.form.value);
    
  }
}
