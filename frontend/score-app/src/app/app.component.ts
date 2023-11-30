import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { TestDefinitionPageComponent } from './components/test-definition-page/test-definition-page.component';
import { TestPerformingPageComponent } from './components/test-performing-page/test-performing-page.component';
import { TestResultPageComponent } from './components/test-result-page/test-result-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ROUTES } from './app.routes';

const PAGES = [
  AdministrationPageComponent,
  TestDefinitionPageComponent,
  TestPerformingPageComponent,
  TestResultPageComponent,
];

const MODULS = [TabMenuModule];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PAGES, MODULS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'score-app';

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  constructor(private routerService: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ROUTES.administrationsPage,
      },
      {
        label: 'Definitions',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ROUTES.testDefinitionsPage,
      },
      {
        label: 'Performing',
        icon: 'pi pi-fw pi-cog',
        routerLink: ROUTES.testPerformingPage,
      },
      {
        label: 'Restuls',
        icon: 'pi pi-fw pi-file',
        routerLink: ROUTES.testRsultsPage,
      },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.routerService.navigateByUrl(this.activeItem.routerLink);
  }
}
