import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult } from '../../models/test-result.model';
import { combineLatest, firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestModel } from 'src/app/models/test.model';
import { ListboxClickEvent } from 'primeng/listbox';
import { DropdownChangeEvent } from 'primeng/dropdown';

@UntilDestroy()
@Component({
  selector: 'app-test-result-page',
  templateUrl: './test-result-page.component.html',
  styleUrls: ['./test-result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestResultPageComponent {

  currentCriteriaIndex = 0;
  currentCriteriaNextIndex = 1;
  testDone = false;
  currentTestResult: TestResult;
  tests: TestModel[];
  selectedTest: TestModel;
  isNewTest: boolean;



  constructor(
    private testsService: TestsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
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
        // if (!this.isNewTest) {
        //   this.currentTestResult = testsResults.find(
        //     (t) => t.id === params['id']
        //   );
        // }
      });
  }

  onTestItemClick(event: DropdownChangeEvent) {
    this.selectedTest = this.tests.find((t) => t.name === event.value?.name);
    if (this.selectedTest) {
      this.currentCriteriaNextIndex = this.currentCriteriaIndex = 0;
      this.testDone = false;
      this.cd.markForCheck();
    }
  }

  onNextQuestion() {
    if (this.currentCriteriaIndex < this.selectedTest.criterias?.length) {
      this.currentCriteriaIndex++;
      this.currentCriteriaNextIndex = this.currentCriteriaIndex + 1;
    } else {
      this.testDone = true;
    }
    this.cd.markForCheck();
  }

  onDoneTest() {
    
  }
}
