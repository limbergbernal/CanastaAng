import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { UnidadService } from '../../../../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { options } from '../../../../helpers/options.helper';
import { Unidad, UnidadPost } from '../../../../models/unidad.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { ComponentsModule } from "../../../../components/components.module";
import { FormErrorService } from '../../../../components/services/form-error.service';

@Component({
  selector: 'app-creaup-unidad',
  templateUrl: './creaup-unidad.component.html',
  styles: ``,
})
export class CreaupUnidadComponent implements OnInit {

  @Input({required: true}) title:boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Unidad>();

  public estados: string[] = options.estados;
  public unidadForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  constructor(public unidadService: UnidadService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.unidadForm = this.fb.group({
      nombre: ['', Validators.required],
      abreviacion: ['', Validators.required],
      estado: [null, Validators.required],
    });
  }

  editar(): void{
    this.title = false;
    this.unidadForm.patchValue(this.unidadService.item);
  }

  save(): void{
    // validando formulario
    if(this.unidadForm.invalid){
      this.FormErrorHelper.touchAll(this.unidadForm);
      return;
    }
    let unidad: Unidad = this.unidadForm.value;
    // si el formulario es valido
    const request = this.title
      ? this.unidadService.create(unidad)
      : this.unidadService.update(unidad);

    request.subscribe({
      next: (resp) =>{
        let unidadResp: Unidad = resp;
        this.resetAll();
        SwalHelper.showSuccess(this.unidadService.message);
        this.updateTable.emit(unidadResp);
      },
      error: (err) =>{
        if(err.status === 422){
          this.FormErrorHelper.setServerErrors(this.unidadForm, err.error.errors);
        }
      }
    })
  }

  onCloseModal(): void{
    this.resetAll();
  }

  resetAll(): void{
    this.unidadForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
