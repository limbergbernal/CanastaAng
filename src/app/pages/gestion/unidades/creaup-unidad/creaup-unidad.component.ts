import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { UnidadService } from '../../../../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { options } from '../../../../helpers/options.helper';
import { Unidad, UnidadPost } from '../../../../models/unidad.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { ComponentsModule } from "../../../../components/components.module";

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

  public estados:string[] = options.estados;
  public unidadForm: FormGroup;

  constructor(public unidadService: UnidadService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.unidadForm = this.fb.group({
      'nombre' : ['', Validators.required],
      'abreviacion':['', Validators.required],
      'estado': [null, Validators.required]
    });
  }
  editar(unidad: Unidad): void{
    this.unidadService.unidad = unidad;
    this.unidadForm.patchValue(unidad);
  }
  save(){
    if(this.unidadForm.valid){
      let unidad: Unidad = this.unidadForm.value;
      if(this.title){
        //create unidad
        this.unidadService.create(unidad).subscribe({
          next: (resp)=>{
            let unidad: Unidad = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(unidad);
          },
          error: ()=>{}
        })
      }else{
        // update unidad
        this.unidadService.update(unidad).subscribe({
          next: (resp)=> {
            let unidad: Unidad = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(unidad);

          },
          error:()=>{}
        })
      }
    }
  }
  resetAll(): void{
    this.unidadForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
