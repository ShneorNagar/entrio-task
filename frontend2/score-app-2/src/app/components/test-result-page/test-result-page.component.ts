import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult } from '../../models/test-result.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-test-result-page',
  templateUrl: './test-result-page.component.html',
  styleUrls: ['./test-result-page.component.scss'],
})
export class TestResultPageComponent implements OnInit {
  constructor(
    private testsService: TestsService,
    private route: ActivatedRoute
  ) {}

  currentTestResult: TestResult;

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
    });
  }
}
