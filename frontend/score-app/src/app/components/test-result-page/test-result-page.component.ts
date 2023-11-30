import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult } from '../../models/test-result.model';
import { combineLatest, firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-test-result-page',
  templateUrl: './test-result-page.component.html',
  styleUrls: ['./test-result-page.component.scss'],
})
export class TestResultPageComponent implements OnInit {
  currentTestResult: TestResult;
  isNewTest: boolean;

  constructor(
    private testsService: TestsService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    combineLatest([this.testsService.testsResults$, this.route.queryParams])
      .pipe(untilDestroyed(this))
      .subscribe(([testsResults, params]) => {
        this.isNewTest = params['newTest'];
        if (!this.isNewTest) {
          this.currentTestResult = testsResults.find(
            (t) => t.id === params['id']
          );
        }
      });

  }
}
