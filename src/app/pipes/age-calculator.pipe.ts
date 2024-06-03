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
    // we take the difference between the years
    let age = today.getFullYear() - birthDate.getFullYear();
    // we take the difference between the month number
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the date of birth has not yet passed this year, we subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    // we return the string with the number of years
    return `${age} años`;
  }

}
