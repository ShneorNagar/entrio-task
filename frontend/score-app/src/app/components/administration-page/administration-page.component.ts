import { Component } from '@angular/core';
import { ListboxClickEvent, ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TestsService } from '../../services/tests.service';
import { TestModel } from '../../models/test.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ROUTES } from '../../app.routes';
import { JsonPipe } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';



const PRIMENG_MODULS = [ListboxModule, ButtonModule, SidebarModule];

@UntilDestroy()
@Component({
  selector: 'app-administration-page',
  standalone: true,
  imports: [FormsModule, PRIMENG_MODULS, JsonPipe],
  templateUrl: './administration-page.component.html',
  styleUrl: './administration-page.component.scss',
})
export class AdministrationPageComponent {
  tests: TestModel[] = [];
  dialogVisible: boolean = false;

  sidebarVisible: boolean = false;
  selectedTest: TestModel | undefined;

  constructor(private testsService: TestsService, private router: Router) {}

  ngOnInit() {
    this.testsService.tests.pipe(untilDestroyed(this)).subscribe((tests) => {
      this.tests = tests;
    });
  }

  onItemClick(event: ListboxClickEvent) {
    this.selectedTest = this.tests.find((t) => t.name === event.option?.name);
    console.log(event);
  }

  onDefineNewTestClick() {
    this.router.navigateByUrl(ROUTES.testDefinitionsPage);
  }
}
