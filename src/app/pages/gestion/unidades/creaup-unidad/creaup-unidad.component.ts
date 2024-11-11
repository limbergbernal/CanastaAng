import { Component, Input, input, OnInit, output } from '@angular/core';
import { UnidadService } from '../../../../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { options } from '../../../../helpers/options.helper';
import { Unidad, UnidadPost } from '../../../../models/unidad.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-creaup-unidad',
  templateUrl: './creaup-unidad.component.html',
  styles: ``
})
export class CreaupUnidadComponent implements OnInit {

  @Input() title:boolean = true;
  unidadChange = output<Unidad|UnidadPost>();
  public estados:string[];
  public unidadForm: FormGroup;
  public create: boolean = true;

  constructor(public unidadService: UnidadService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.unidadForm = this.fb.group({
      'nombre' : ['', Validators.required],
      'abreviacion':['', Validators.required],
      'estado': [null, Validators.required]
    });
    this.estados = options.estados;
  }
  save(){
    if(this.unidadForm.valid){
      if(this.create){
        //create unidad
        let unidad: UnidadPost = this.unidadForm.value;
        this.unidadService.create(unidad).subscribe({
          next: (resp)=>{
            this.cerrarModal();
            SwalHelper.showSuccess(resp.message);
            this.unidadChange.emit(resp.data);
          },
          error: ()=>{}
        })
      }else{
        // update unidad
        this.unidadService.update(this.unidadForm.value).subscribe({
          next: (resp)=> {
            this.cerrarModal();
            SwalHelper.showSuccess(resp.message);
            this.unidadChange.emit(resp.data);
          },
          error:()=>{}
        })
      }
    }
  }
  abrirModal(unidad: Unidad|undefined = undefined, estado: boolean = true): void{
    this.create = estado;
    this.unidadService.abrirModal();
    if(unidad != undefined){
      this.unidadService.unidad = unidad;
      this.unidadForm.patchValue(unidad);
    }
  }
  cerrarModal(){
    this.reset();
    this.unidadService.cerrarModal();
  }
  reset(): void{
    this.unidadForm.reset();
    this.create = true;
  }
}
