import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { Pokemon } from '../../../../types/pokemon/pokemon.type';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { FormatPokemonIdPipe } from '../../../../pipes/format-pokemon-id.pipe';
import { UserService } from '../../../../services/user/user.service';
import { AgeCalculatorPipe } from '../../../../pipes/age-calculator.pipe';
import { DuiFormaterPipe } from '../../../../pipes/dui-formater.pipe';
import { Router } from '@angular/router';

type PokemonToSelect = Pokemon & { selected?: boolean }

@Component({
  selector: 'app-pokemon-selector',
  standalone: true,
  imports: [JsonPipe, FormatPokemonIdPipe, TitleCasePipe, AgeCalculatorPipe, DuiFormaterPipe],
  templateUrl: './pokemon-selector.component.html',
  styleUrl: './pokemon-selector.component.scss'
})
export class PokemonSelectorComponent implements OnInit {

  private http = inject(HttpClient);
  private userService = inject(UserService)
  private router = inject(Router)

  public account = this.userService.accountPublic

  public canSelectPokemon = true

  public searchValue = signal('')

  public pokemons = signal<PokemonToSelect[] | null>(null)
  private pokemonSelected: PokemonToSelect[] = []
  public pokemonsToShow = computed(() => {
    const pokemons = this.pokemons()
    const searchValue = this.searchValue()
    if (searchValue) return pokemons?.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) || String(pokemon.id).toLowerCase().includes(searchValue.toLowerCase())
    })
    return pokemons
  })

  async ngOnInit() {
    let pokemonResults = await lastValueFrom(this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=9'))
    let pokemonsWithData = await Promise.allSettled(pokemonResults.results.map(async (pokemon: any) => lastValueFrom(this.http.get(pokemon.url))))
    let pokemonsResponse: PokemonToSelect[] = pokemonsWithData.filter((result) => result.status === 'fulfilled').map(({ value }: any) => value).filter((value: PokemonToSelect[]) => value)
    this.pokemons.set(pokemonsResponse)
    const pokemons = this.userService.chosenPokemonsPublic()
    if (pokemons.length > 0) {
      this.pokemonSelected = pokemons.map((pokemon: any) => {
        pokemon.selected = true
        return pokemon as PokemonToSelect
      })
      this.pokemons.update((pokemonsData) => {
        pokemonsData = pokemonsData?.filter((pokemon) => {
          return !this.pokemonSelected.some((pokemonItemSelected) => pokemonItemSelected.id === pokemon.id)
        }) ?? []
        pokemonsData.push(...this.pokemonSelected)
        pokemonsData.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
        })
        this.canSelectPokemon = this.pokemonSelected.length < 3
        return pokemonsData
      })
    }
    console.log("🚀 ~ PokemonSelectorComponent ~ ngOnInit ~ pokemonsResponse:", pokemonsResponse)
  }

  selectPokemon = (pokemon: PokemonToSelect) => {

    const hasPokemon = this.pokemonSelected.filter((pokemonSelected) => {
      return pokemonSelected.id === pokemon.id
    }).at(0)
    if (hasPokemon) {
      pokemon.selected = false
      this.pokemonSelected = this.pokemonSelected.filter((pokemonSelected) => {
        return pokemonSelected.id !== pokemon.id
      })
    } else {
      if (this.canSelectPokemon) {
        pokemon.selected = true
        this.pokemonSelected.push(pokemon)
      } else {
        alert('Solo puedes escoger 3 pokemons')
      }
    }
    this.canSelectPokemon = this.pokemonSelected.length < 3
  }

  public savePokemons = () => {
    this.userService.setPokemons(this.pokemonSelected.map((pokemon) => {
      delete pokemon.selected
      return pokemon as Pokemon
    }))
    this.router.navigate(['list'])
  }

  setSearchValue = (value: Event) => {
    const input = value.target as HTMLInputElement
    this.searchValue.set(input.value)
  }

}
