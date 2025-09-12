import { Component, inject, Input, OnInit } from '@angular/core';
import { options } from '../../../../helpers/options.helper';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../../../../components/services/form-error.service';
import { UsuarioFormService } from '../../../../services/forms/usuario-form.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioPost } from '../../../../models/usuario.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: ``
})
export class CrearUsuarioComponent implements OnInit{

  private idUsuario;
  public title: boolean = true;
  public router = inject(Router)
  public estados: string[] = options.estados;
  public usuarioForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  public estadoCivil: string[] = options.estadoCivil;
  public generos: string[] = options.genero;
  public expedidos = options.expedidos;


  constructor(private route: ActivatedRoute,
              private formService: UsuarioFormService,
              private usuarioService: UsuarioService
  ){ }
  ngOnInit(): void {
    this.idUsuario = +this.route.snapshot.paramMap.get('id')!;
    this.title = !!this.idUsuario;
    this.usuarioForm = this.formService.createForm();
    if(this.title){
      this.usuarioService.getById(this.idUsuario).subscribe({
        next: (resp) => {
          console.log(resp);
          this.usuarioForm.patchValue(resp);
          this.usuarioForm.patchValue(resp.persona);
        },
        error: (err) => {
          SwalHelper.showError("Error al cargar el usuario.")
        }
      })
    }else{

      this.title = true;
    }

  }
  save(){
    if(this.usuarioForm.invalid){
      this.FormErrorHelper.touchAll(this.usuarioForm);
      return;
    }
    const payload = new UsuarioPost(this.usuarioForm.value);
    const request = this.title
      ? this.usuarioService.create(payload)
      : this.usuarioService.update(payload);

    request.subscribe({
      next: (resp) =>{
        this.resetAll();
        SwalHelper.showSuccess("Registro exitoso");
        this.router.navigate(['dashboard/usuarios']);
      },
      error: (err)=>{
        if(err.status === 422){
          this.FormErrorHelper.setServerErrors(this.usuarioForm, err.error.errors);
        }
      }
    });
  }
  cancelar(){
    this.router.navigate(['dashboard/usuarios']);
  }
  resetAll(){
    this.usuarioForm.reset();

  }
}
