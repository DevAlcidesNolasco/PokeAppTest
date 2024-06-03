import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPokemonId',
  standalone: true
})
export class FormatPokemonIdPipe implements PipeTransform {

  transform(value: number): string {
    return `#${value.toString().padStart(3, '0')}`;;
  }

}
