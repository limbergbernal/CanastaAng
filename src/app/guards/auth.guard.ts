import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { catchError, tap } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const check = await usuarioService.validarToken();
  if(!check){
    router.navigateByUrl('/login');
    return false
  }
  return true;
};
