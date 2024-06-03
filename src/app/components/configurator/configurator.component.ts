import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../../types/account/account.type';
import { JsonPipe } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.scss'
})
export class ConfiguratorComponent {

  private formBuilder = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)


  public account = this.userService.accountPublic
  public imageSelected: string | null = null
  public isAdult: boolean = true

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
    photoUrl: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  })

  formattedDui = '';

  public setFocus = (field: 'fullName' | 'birthdate' | 'hobby' | 'dni') => {
    this.isFocus[field] = true
  }

  public setBlur = (field: 'fullName' | 'birthdate' | 'hobby' | 'dni') => {
    this.isFocus[field] = false
  }

  public onSubmit = () => {
    const { fullName, dni, birthdate, hobby, photoUrl } = this.informationForm.value
    console.log("🚀 ~ ConfiguratorComponent ~ dni:", dni)
    if (fullName && birthdate && photoUrl && this.imageSelected) {
      let account: Account = {
        fullName,
        dni: String(dni),
        birthdate: new Date(birthdate),
        photoData: photoUrl,
        photoName: this.imageSelected,
        isAdult: this.isAdult,
        hobby: hobby ?? undefined
      }
      this.userService.setAccountData(account)
      this.router.navigate(['/list'])
    }
  }

  public onDragOver = (event: DragEvent) => {
    // console.log(event)
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }

  public onDrop = (event: DragEvent) => {
    // We prevent it from doing the default action when dropping the image, and we also prevent the propagation of the event to the other elements of the dom.
    event.preventDefault();
    event.stopPropagation();

    // If an image was placed we proceed to operate with it
    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      const reader = new FileReader()
      // We convert it to base64 only for practical purposes of the test
      reader.readAsDataURL(event.dataTransfer?.files[0])
      this.imageSelected = event.dataTransfer?.files[0].name ?? null
      reader.onload = () => {
        this.informationForm.patchValue({ photoUrl: reader.result?.toString() })
      }
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.isAdult) {
      const rawValue = input.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
      if (rawValue.length > 8) {
        this.formattedDui = rawValue.slice(0, 8) + '-' + rawValue.slice(8, 9);
      } else {
        this.formattedDui = rawValue;
      }

    } else {
      this.formattedDui = input.value
    }

  }

  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Permitir Backspace y Delete
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }

    // Permitir flechas izquierda y derecha
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      return;
    }

    // Prevenir cualquier otra tecla si ya hay 10 caracteres (incluyendo el guion)
    if (value.length >= 10 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  changeDate = (event: Event) => {
    const dateSelected = new Date((event.target as HTMLInputElement).value)
    const today = new Date();
    const age = today.getFullYear() - dateSelected.getFullYear();
    const monthDiff = today.getMonth() - dateSelected.getMonth();
    // For validation manipulation we take the entered date
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateSelected.getDate())) {
      this.isAdult = age - 1 >= 18; // Si aún no ha cumplido años, resta uno
    }
    this.isAdult = age >= 18;
    const fieldDui = this.informationForm.get('dni')
    // If it is an adult, we set validations again
    if (this.isAdult) {
      fieldDui?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    } else {
      // If you are not of legal age we simply remove the validations from the field.
      fieldDui?.clearValidators()
    }
    // We update so that the changes are applied
    fieldDui?.updateValueAndValidity();
  }

}
