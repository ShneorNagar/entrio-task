import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ListboxClickEvent } from 'primeng/listbox';
import { TestsService } from '../../services/tests.service';
import { TestModel } from '../../models/test.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/app-routing.module';
import { TreeNode } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministrationPageComponent {
  tests: TestModel[] = [];
  visible: boolean = false;
  treeNodes: TreeNode[];

  selectedTest: TestModel;

  constructor(
    private testsService: TestsService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.testsService.tests$.pipe(untilDestroyed(this)).subscribe((tests) => {
      this.tests = tests;
    });
  }

  onItemClick(event: ListboxClickEvent) {
    this.selectedTest = this.tests.find((t) => t.name === event.option?.name);
    this.buildTreeNode();
    this.visible = true;
  }

  onDefineNewTestClick() {
    this.router.navigateByUrl(ROUTES.testDefinitionsPage);
  }

  buildTreeNode() {
    this.treeNodes = [];
    this.selectedTest.criterias.forEach((c, i) => {
      this.treeNodes.push({
        key: i + '',
        label: c.question,
        children: c.answers.map((a, j) => {
          return {
            key: j + '',
            label: a.text,
          } as TreeNode;
        }),
      });
    });
    this.cd.markForCheck();
  }
}
