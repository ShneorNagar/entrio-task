import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult, TestScoreSeverity } from '../../models/test-result.model';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TestModel } from 'src/app/models/test.model';
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
  companyNameInputValue: string;
  selectedCriteriaIndex = 0;
  selectedAnswerIndex = 0;

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

  answerClick(criteriaIndex: number, selectedAnswerIndex: number) {
    this.selectedCriteriaIndex = criteriaIndex;
    this.selectedAnswerIndex = selectedAnswerIndex;
  }

  updateSelectedAnswer() {
    this.selectedTest.criterias[this.selectedCriteriaIndex].answers =
      this.selectedTest.criterias[this.selectedCriteriaIndex].answers.map(
        (a, i) => {
          return { ...a, isSelected: i === this.selectedAnswerIndex };
        }
      );
  }

  onNextQuestion() {
    this.updateSelectedAnswer();
    if (this.currentCriteriaIndex < this.selectedTest.criterias?.length) {
      this.currentCriteriaIndex++;
      this.currentCriteriaNextIndex = this.currentCriteriaIndex + 1;
    } else {
      this.testDone = true;
    }
    this.cd.markForCheck();
  }

  onDoneTest() {
    this.updateSelectedAnswer();
    console.log(this.selectedTest);
    console.log(this.companyNameInputValue);
    const finalScore: number = Number(this.calcFinalScore().toFixed(1));
    console.log(`final score: `, finalScore);

    // todo get testsResults and uppend the test resut into them, than update
    this.testsService.saveNewTestResult({
      id: '1',
      companyName: this.companyNameInputValue,
      finalScore: finalScore,
      scoreSeverity: this.scoreToSeverityMap(finalScore),
      tests: [this.selectedTest],
    });
  }

  calcFinalScore() {
    return this.selectedTest.criterias.reduce((finalScore, criteria) => {
      const criteriaScore = criteria.answers
        .filter((a) => a.isSelected)
        .reduce((totalScore, answer) => {
          return totalScore + criteria.weight * answer.score;
        }, 0);
      return finalScore + criteriaScore;
    }, 0);
  }

  scoreToSeverityMap(score: number): TestScoreSeverity {
    switch (true) {
      case score < 1:
        return 'danger';
      case score < 2:
        return 'warning';
      case score < 3:
        return 'info';
      default:
        return 'success';
    }
  }
}
