import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './demo/service/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isLoggedIn = userService.isUserLoggedIn();

  const publicRoutes = ['login', 'register', '', 'contact'];

  if (isLoggedIn) {
    // Si el usuario ya está logueado e intenta ir a login o register, lo redirigimos al dashboard
    if (publicRoutes.includes(route.routeConfig?.path || '')) {
      router.navigate(['/dashboard']);
      return false;
    }
  } else {
    // Si el usuario NO está logueado e intenta ir a cualquier otra ruta excepto login o register
    if (!publicRoutes.includes(route.routeConfig?.path || '')) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
