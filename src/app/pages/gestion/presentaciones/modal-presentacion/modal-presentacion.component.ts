import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { Presentacion } from '../../../../models/presentacion.model';
import { options } from '../../../../helpers/options.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PresentacionService } from '../../../../services/presentacion.service';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-modal-presentacion',
  templateUrl: './modal-presentacion.component.html',
  styles: ``
})
export class ModalPresentacionComponent {
  @Input({required: true}) title:boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Presentacion>();

  public estados:string[] = options.estados;
  public presentacionForm: FormGroup;

  constructor(public presentacionService: PresentacionService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.presentacionForm = this.fb.group({
      'nombre' : ['', Validators.required],
      'abreviacion':['', Validators.required],
      'estado': [null, Validators.required]
    });
  }
  editar(presentacion: Presentacion): void{
    this.title = false;
    this.presentacionService.presentacion = presentacion;
    this.presentacionForm.patchValue(presentacion);
  }
  save(){
    if(this.presentacionForm.valid){
      let presentacion: Presentacion = this.presentacionForm.value;
      if(this.title){
        //create unidad
        this.presentacionService.create(presentacion).subscribe({
          next: (resp)=>{
            let presentacion: Presentacion = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(presentacion);
          },
          error: ()=>{}
        })
      }else{
        // update unidad
        this.presentacionService.update(presentacion).subscribe({
          next: (resp)=> {
            let presentacion: Presentacion = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(presentacion);

          },
          error:()=>{}
        })
      }
    }
  }
  resetAll(): void{
    this.presentacionForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
