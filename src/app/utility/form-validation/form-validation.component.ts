import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  imports: [],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.css'
})
export class FormValidationComponent {

  @Input() FormGroup: FormGroup | any ;
  @Input() fieldName: string | any;
  @Input() showName: string | any;
  @Input() minlength: string | any;
  @Input() maxlength: string | any;

}
