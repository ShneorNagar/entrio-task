import { Component } from '@angular/core';
import { ListboxClickEvent, ListboxModule } from 'primeng/listbox';
import { TestsService } from '../../services/tests.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormsModule } from '@angular/forms';
import { TestResult, TestScoreSeverity } from '../../models/test-result.model';
import { TagModule } from 'primeng/tag';
import { ROUTES } from '../../app.routes';

const PRIME_NG_MODULES = [ListboxModule, TagModule];

@UntilDestroy()
@Component({
  selector: 'app-test-performing-page',
  standalone: true,
  imports: [ListboxModule, FormsModule, PRIME_NG_MODULES],
  templateUrl: './test-performing-page.component.html',
  styleUrl: './test-performing-page.component.scss',
})
export class TestPerformingPageComponent {
  testsResults: TestResult[] = [];
  dialogVisible: boolean = false;

  sidebarVisible: boolean = false;
  selectedTestResult: TestResult;

  constructor(private testsService: TestsService, private router: Router) {}

  ngOnInit() {
    this.testsService.testsResults$
      .pipe(untilDestroyed(this))
      .subscribe((testsResults) => {
        this.testsResults = testsResults;
      });
  }

  onItemClick(event: ListboxClickEvent) {
    this.selectedTestResult = this.testsResults.find(
      (t: TestResult) => t.companyName === event.option?.companyName
    );
    this.testsService.selectedTestResult = this.selectedTestResult;
    this.router.navigate([ROUTES.testRsultsPage], {
      queryParams: {
        id: this.selectedTestResult.id,
      },
    });
  }

  // todo use in create test
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
