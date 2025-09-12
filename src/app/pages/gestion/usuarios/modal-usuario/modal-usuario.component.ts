import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { Usuario, UsuarioPost } from '../../../../models/usuario.model';
import { options } from '../../../../helpers/options.helper';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../../../../components/services/form-error.service';
import { UsuarioFormService } from '../../../../services/forms/usuario-form.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styles: ``
})
export class ModalUsuarioComponent implements OnInit{
  @Input({ required: true}) title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Usuario>();

  public estados: string[] = options.estados;
  public usuarioForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  constructor(
    private formService: UsuarioFormService,
    private usuarioService: UsuarioService
  ){}
  ngOnInit(): void {
    this.usuarioForm = this.formService.createForm();
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
        next: (resp) => {
          let usuarioResp: Usuario = resp;
          this.resetAll();
          SwalHelper.showSuccess("Guardado exitosamente.");
          this.updateTable.emit(usuarioResp);
        },
        error: (err) => {
          if(err.status === 422){
            this.FormErrorHelper.setServerErrors(this.usuarioForm, err.error.errros);
          }
        }
      });
  }

  onCloseModal() {
    this.resetAll();
  }

  resetAll(): void {
    this.usuarioForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }

}
