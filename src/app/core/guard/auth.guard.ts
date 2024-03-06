import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | UrlTree => {
  // Aquí colocarías la lógica para verificar si el usuario está autenticado o tiene los roles necesarios
  // Por ejemplo, podrías verificar si existe un token en el almacenamiento local
  const isLoggedIn = localStorage.getItem('token') !== null;

  if (isLoggedIn) {
    // Si el usuario está autenticado, permitir el acceso a la ruta
    return true;
  } else {
    // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
    return false;
  }
};
