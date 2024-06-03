import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCalculator',
  standalone: true
})
export class AgeCalculatorPipe implements PipeTransform {

  transform(value: Date | undefined): string {

    if (!value) {
      return 'Edad no disponible';
    }

    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Si la fecha de nacimiento aún no ha pasado este año, restamos 1 a la edad
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return `${age} años`;
  }

}
