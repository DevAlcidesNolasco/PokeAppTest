import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const hasPokemonsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  const pokemons = userService.chosenPokemonsPublic()
  if (pokemons.length > 0) return true
  return router.createUrlTree(['pokemon-selector']);
};
