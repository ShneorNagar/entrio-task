import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-answers-form-part',
  templateUrl: './answers-form-part.component.html',
  styleUrls: ['./answers-form-part.component.scss']
})
export class AnswersFormPartComponent {

  @Input() answers: FormArray;
}
