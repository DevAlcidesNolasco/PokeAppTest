import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duiFormater',
  standalone: true
})
export class DuiFormaterPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) {
      return 'Número inválido';
    }
    if (!value || value.length !== 9 || isNaN(Number(value))) {
      return 'Número inválido';
    }
    return `${value.substring(0, 8)}-${value.substring(8)}`;
  }

}
