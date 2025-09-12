import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioBase } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFormService {

  constructor(private fb: FormBuilder) {

  }
  createForm(usuario?: UsuarioBase): FormGroup{
    return this.fb.group({
      email: [usuario?.email || '', [Validators.required, Validators.email]],
      username: [usuario?.username || '', Validators.required],
      password: [usuario?.password || '', Validators.required],
      telefono: [usuario?.telefono || '', Validators.required],
      estado: [usuario?.estado || 'Activo', Validators.required],
      ci: [usuario?.persona?.ci || '', Validators.required],
      expedido: [usuario?.persona?.expedido || '', Validators.required],
      nombres: [usuario?.persona.nombres || '', Validators.required],
      apellido_p: [usuario?.persona.apellido_p || '', Validators.required],
      apellido_m: [usuario?.persona.apellido_m || '', Validators.required],
      fecha_nac: [usuario?.persona?.fecha_nac || '', Validators.required],
      sexo: [usuario?.persona?.sexo || '', Validators.required],
      civil: [usuario?.persona?.civil || '', Validators.required],
      foto: [usuario?.foto || null]
    });
  }
}
