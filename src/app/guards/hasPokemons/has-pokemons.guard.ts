import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const hasPokemonsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  const pokemons = userService.chosenPokemonsPublic()
  // If the number of selected pokemons is greater than 0 we can enter
  if (pokemons.length > 0) return true
  // If the above did not happen, we return to the pokemon selection
  return router.createUrlTree(['pokemon-selector']);
};
