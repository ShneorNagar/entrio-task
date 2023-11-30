import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { TestDefinitionPageComponent } from './components/test-definition-page/test-definition-page.component';
import { TestPerformingPageComponent } from './components/test-performing-page/test-performing-page.component';
import { TestResultPageComponent } from './components/test-result-page/test-result-page.component';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const PRIMENG_MODULS = [ListboxModule, ButtonModule, InputTextModule, TagModule, TabMenuModule, DialogModule];

@NgModule({
  declarations: [
    AppComponent,
    AdministrationPageComponent,
    TestDefinitionPageComponent,
    TestPerformingPageComponent,
    TestResultPageComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule,  AppRoutingModule, FormsModule, ReactiveFormsModule, PRIMENG_MODULS],
  providers: [],
  bootstrap: [
    AppComponent,
    AdministrationPageComponent,
    TestDefinitionPageComponent,
    TestPerformingPageComponent,
    TestResultPageComponent,
  ],
})
export class AppModule {}
