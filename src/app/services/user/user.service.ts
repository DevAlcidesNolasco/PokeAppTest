import { Injectable, computed, signal } from '@angular/core';
import { Account } from '../../types/account/account.type';
import { Pokemon } from '../../types/pokemon/pokemon.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // If we were having a real session case, I would prefer to use rxjs to validate flows and data in a better way

  // We have the behaviorSubjects for internal use to change states in the session or in the user information
  // private account = new BehaviorSubject<any | null | undefined>(null)


  // Then we would have the observable to emit the information to the necessary places in the app (this does not allow changes in itself)
  // public account$ = this.account.pipe(
  //   distinctUntilChanged()
  // )


  // Otherwise, for this test we are going to use observables, since Angular recommends using them because they give much better performance and to be able to use the ChangeDetectorStrategy onPush

  // we use a signal() for the variable that we are going to be manipulating
  private account = signal<Account | null>(null)

  // and we use a computed to emit values ​​throughout the app that cannot be changed
  public accountPublic = computed(() => {
    return this.account()
  })


  // the same for the selected pokemons, one to manipulate data and another to emit values ​​and cannot make internal changes to the data
  private chosenPokemons = signal<Pokemon[]>([])
  public chosenPokemonsPublic = computed(() => {
    return this.chosenPokemons()
  })

  constructor() { }



  // Next we set the necessary values ​​in their corresponding signals
  setAccountData = (value: Account) => {
    this.account.set(value)
  }

  setPokemons = (pokemons: Pokemon[]) => {
    this.chosenPokemons.set(pokemons)
  }

}
