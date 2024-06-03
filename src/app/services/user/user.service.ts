import { Injectable, computed, signal } from '@angular/core';
import { Account } from '../../types/account/account.type';
import { Pokemon } from '../../types/pokemon/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // If we were using a real session case, it would be better to use rxjs(BehaviorSubject | Observable) to validate the 2 session states (user | null)
  // private account = new BehaviorSubject<any | null | undefined>(null)
  // public account$ = this.account.pipe(
  //   distinctUntilChanged()
  // )

  private account = signal<Account | null>(null)
  public accountPublic = computed(() => {
    return this.account()
  })

  private chosenPokemons = signal<Pokemon[]>([])
  public chosenPokemonsPublic = computed(() => {
    return this.chosenPokemons()
  })

  constructor() { }

  setAccountData = (value: Account) => {
    this.account.set(value)
    localStorage.setItem('pokeAppAccount', JSON.stringify(value))
  }

  setPokemons = (pokemons: Pokemon[]) => {
    this.chosenPokemons.set(pokemons)
  }

}
