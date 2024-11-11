import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.validarToken().pipe(
    tap( isAuth => {
      if(!isAuth){
        router.navigateByUrl('/login');
      }
    })
  );
};
