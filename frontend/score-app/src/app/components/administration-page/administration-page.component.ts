import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListboxClickEvent } from 'primeng/listbox';
import { TestsService } from '../../services/tests.service';
import { TestModel } from '../../models/test.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/app-routing.module';


@UntilDestroy()
@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministrationPageComponent {
  tests: TestModel[] = [];
  visible: boolean = false;

  selectedTest: TestModel | undefined;

  constructor(private testsService: TestsService, private router: Router) {}

  ngOnInit() {
    this.testsService.tests$.pipe(untilDestroyed(this)).subscribe((tests) => {
      this.tests = tests;
    });
  }

  onItemClick(event: ListboxClickEvent) {
    this.selectedTest = this.tests.find((t) => t.name === event.option?.name);
    this.visible = true;
  }

  onDefineNewTestClick() {
    this.router.navigateByUrl(ROUTES.testDefinitionsPage);
  }
}
