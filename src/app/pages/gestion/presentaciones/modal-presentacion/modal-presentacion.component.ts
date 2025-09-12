import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { Presentacion } from '../../../../models/presentacion.model';
import { options } from '../../../../helpers/options.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresentacionService } from '../../../../services/presentacion.service';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { FormErrorService } from '../../../../components/services/form-error.service';

@Component({
  selector: 'app-modal-presentacion',
  templateUrl: './modal-presentacion.component.html',
  styles: ``,
})
export class ModalPresentacionComponent {
  @Input({ required: true }) title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Presentacion>();

  public estados: string[] = options.estados;
  public presentacionForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  constructor(
    public presentacionService: PresentacionService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.presentacionForm = this.fb.group({
      nombre: ['', Validators.required],
      abreviacion: ['', Validators.required],
      estado: [null, Validators.required],
    });
  }
  editar(): void {
    this.title = false;
    this.presentacionForm.patchValue(this.presentacionService.item);
  }
  save() {
    // validando formulario
    if (this.presentacionForm.invalid) {
      this.FormErrorHelper.touchAll(this.presentacionForm);
      return;
    }
    let presentacion: Presentacion = this.presentacionForm.value;
    // si el formulario es valido
    const request = this.title
      ? this.presentacionService.create(presentacion)
      : this.presentacionService.update(presentacion);
    request.subscribe({
      next: (resp) => {
        let presentacionResp: Presentacion = resp;
        this.resetAll();
        SwalHelper.showSuccess(this.presentacionService.message);
        this.updateTable.emit(presentacionResp);
      },
      error: (err) => {
        if (err.status === 422) {
          this.FormErrorHelper.setServerErrors(
            this.presentacionForm,
            err.error.errors
          );
        }
      },
    });
  }
  onCloseModal() {
    this.resetAll();
  }

  resetAll(): void {
    this.presentacionForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
