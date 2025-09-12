import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { options } from '../../../../helpers/options.helper';
import { ProfesionService } from '../../../../services/profesion.service';
import { Profesion } from '../../../../models/profesion.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { FormErrorService } from '../../../../components/services/form-error.service';

@Component({
  selector: 'app-modal-profesion',
  templateUrl: './modal-profesion.component.html',
  styles: ``,
})
export class ModalProfesionComponent implements OnInit {
  @Input() title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Profesion>();

  public tipos: string[] = [];
  public estados: string[] = [];
  public profesionForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  constructor(
    private fb: FormBuilder,
    private profesionService: ProfesionService
  ) {
    this.tipos = options.profesionTipos;
    this.estados = options.estados;
  }
  ngOnInit(): void {
    this.profesionForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: [null, Validators.required],
      estado: [null, Validators.required],
    });
  }
  save() {
    // validando formulario
    if (this.profesionForm.invalid) {
      this.FormErrorHelper.touchAll(this.profesionForm);
      return;
    }
    let profesion: Profesion = this.profesionForm.value;
    const request = this.title
      ? this.profesionService.create(profesion)
      : this.profesionService.update(profesion);

    request.subscribe({
      next: (resp) => {
        let profesionResp: Profesion = resp;
        this.resetAll();
        SwalHelper.showSuccess(this.profesionService.message);
        this.updateTable.emit(profesionResp);
      },
      error: (err) => {
        if (err.status === 422) {
          this.FormErrorHelper.setServerErrors(
            this.profesionForm,
            err.error.errors
          );
        }
      },
    });
  }
  editar() {
    this.title = false;
    this.profesionForm.patchValue(this.profesionService.item);
  }
  onCloseModal() {
    // cerrando modal
    this.resetAll();
  }
  resetAll() {
    this.profesionForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
