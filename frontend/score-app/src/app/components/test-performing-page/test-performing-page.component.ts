import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListboxClickEvent } from 'primeng/listbox';
import { TestsService } from '../../services/tests.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TestResult } from '../../models/test-result.model';
import { ROUTES } from 'src/app/app-routing.module';

@UntilDestroy()
@Component({
  selector: 'app-test-performing-page',
  templateUrl: './test-performing-page.component.html',
  styleUrls: ['./test-performing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  onNewTestClick() {
    this.router.navigate([ROUTES.testRsultsPage], {
      queryParams: {
        newTest: true,
      },
    });
  }
}
