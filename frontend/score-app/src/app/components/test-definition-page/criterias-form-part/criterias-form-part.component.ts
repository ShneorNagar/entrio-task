import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-criterias-form-part',
  templateUrl: './criterias-form-part.component.html',
  styleUrls: ['./criterias-form-part.component.scss']
})
export class CriteriasFormPartComponent {

  @Input() criterias: FormArray;

  criteriaAnswers(criteriaIndex: number): FormArray {
    return this.criterias.at(criteriaIndex).get('answers') as FormArray;
  }
}
