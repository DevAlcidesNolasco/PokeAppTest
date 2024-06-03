import { Routes } from '@angular/router';
import { hasUserGuard } from './guards/hasUser/has-user.guard';
import { hasPokemonsGuard } from './guards/hasPokemons/has-pokemons.guard';

export const routes: Routes = [
  {
    path: 'configurator',
    loadComponent: () => import('./components/configurator/configurator.component').then((m) => m.ConfiguratorComponent),
  },
  {
    path: 'pokemon-selector',
    loadComponent: () => import('./components/configurator/components/pokemon-selector/pokemon-selector.component').then((m) => m.PokemonSelectorComponent),
    canActivate: [hasUserGuard]
  },
  {
    path: 'list',
    loadComponent: () => import('./components/list/list.component').then((m) => m.ListComponent),
    canActivate: [hasUserGuard, hasPokemonsGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];
