import { Component } from '@angular/core';
import { ListboxClickEvent, ListboxModule } from 'primeng/listbox';
import { TestModel } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ROUTES } from '../../app.routes';
import { FormsModule } from '@angular/forms';
import { TestResult } from '../../models/test-result.model';

const PRIME_NG_MODULES = [ListboxModule];

@UntilDestroy()
@Component({
  selector: 'app-test-performing-page',
  standalone: true,
  imports: [ListboxModule, FormsModule],
  templateUrl: './test-performing-page.component.html',
  styleUrl: './test-performing-page.component.scss',
})
export class TestPerformingPageComponent {
  testsResults: TestResult[] = [];
  dialogVisible: boolean = false;

  sidebarVisible: boolean = false;
  selectedTestResult: TestResult | undefined;

  constructor(private testsService: TestsService, private router: Router) {}

  ngOnInit() {
    this.testsService.testsResults
      .pipe(untilDestroyed(this))
      .subscribe((testsResults) => {
        this.testsResults = testsResults;
      });
  }

  onItemClick(event: ListboxClickEvent) {
    this.selectedTestResult = this.testsResults.find(
      (t: TestResult) => t.companyName === event.option?.companyName
    );
    console.log(event);
  }

  onDefineNewTestClick() {
    // this.router.navigateByUrl(ROUTES.testDefinitionsPage);
  }
}
