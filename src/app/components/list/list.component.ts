import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Type } from '../../types/pokemon/pokemon.type';
import { GraphicComponent } from './components/graphic/graphic.component';
import { AgeCalculatorPipe } from '../../pipes/age-calculator.pipe';
import { DuiFormaterPipe } from '../../pipes/dui-formater.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [JsonPipe, TitleCasePipe, GraphicComponent, AgeCalculatorPipe, DuiFormaterPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private userService = inject(UserService)
  public pokemons = this.userService.chosenPokemonsPublic
  public account = this.userService.accountPublic

  ngOnInit(): void {
    console.log(this.pokemons())
  }

  typesToStrings = (types: Type[]) => {
    return types.map((type) => type.type.name).join('/')
  }

}
