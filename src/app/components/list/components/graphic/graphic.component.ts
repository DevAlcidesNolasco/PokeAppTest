import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.scss'
})
export class GraphicComponent {

  @Input('title') title: string = ''
  @Input('value') value: number = 0

  private graphicStats: any = {
    'hp': {
      'max_value': 255
    },
    'attack': {
      'max_value': 190
    },
    'defense': {
      'max_value': 230
    },
    'special-attack': {
      'max_value': 194
    },
    'special-defense': {
      'max_value': 230
    },
    'speed': {
      'max_value': 180
    }
  }

  calcularAncho = () => {
    console.log((this.value / this.graphicStats[this.title].max_value) * 100);

    if (this.graphicStats[this.title]) return (this.value / this.graphicStats[this.title].max_value) * 100;
    return 0
  }
}
