import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const hasUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  const user = userService.accountPublic()
  if (user) return true
  return router.createUrlTree(['configurator']);
};
