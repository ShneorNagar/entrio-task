import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { TestDefinitionPageComponent } from './components/test-definition-page/test-definition-page.component';
import { TestResultPageComponent } from './components/test-result-page/test-result-page.component';
import { TestPerformingPageComponent } from './components/test-performing-page/test-performing-page.component';

export const ROUTES = {
  administrationsPage: '',
  testDefinitionsPage: 'definitions',
  testRsultsPage: 'results',
  testPerformingPage: 'performing',
};

export const routes: Routes = [
  { path: '', component: AdministrationPageComponent, pathMatch: 'full' },
  {
    path: 'definitions',
    component: TestDefinitionPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'performing',
    component: TestPerformingPageComponent,
    pathMatch: 'full',
  },
  { path: 'results', component: TestResultPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
