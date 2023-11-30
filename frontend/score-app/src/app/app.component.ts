import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { TestDefinitionPageComponent } from './test-definition-page/test-definition-page.component';
import { TestPerformingPageComponent } from './test-performing-page/test-performing-page.component';
import { TestResultPageComponent } from './test-result-page/test-result-page.component';

const PAGES = [AdministrationPageComponent, TestDefinitionPageComponent, TestPerformingPageComponent, TestResultPageComponent]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PAGES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'score-app';
}
