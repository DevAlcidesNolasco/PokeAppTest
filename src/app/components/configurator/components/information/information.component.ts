import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {

  private formBuilder = inject(FormBuilder)

  public isFocus = {
    fullName: false,
    birthdate: false,
    hobby: false,
    dni: false
  }

  informationForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    hobby: [''],
    // photoUrl: ['', [Validators.required]],
    dni: ['', [Validators.required, this.duiValidator()]]
  })

  public onSubmit = () => {

  }

  private duiValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d{8}-\d{1}$/.test(control.value);
      return valid ? null : { invalidDUI: true };
    };
  }

  public setFocus = (field: 'fullName' | 'birthdate' | 'hobby' | 'dni') => {
    this.isFocus[field] = true
  }

  public setBlur = (field: 'fullName' | 'birthdate' | 'hobby' | 'dni') => {
    this.isFocus[field] = false
  }

}
