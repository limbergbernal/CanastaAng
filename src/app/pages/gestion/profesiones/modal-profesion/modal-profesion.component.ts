import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { options } from '../../../../helpers/options.helper';
import { ProfesionService } from '../../../../services/profesion.service';
import { Profesion } from '../../../../models/profesion.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-modal-profesion',
  templateUrl: './modal-profesion.component.html',
  styles: ``
})
export class ModalProfesionComponent implements OnInit{
  @Input() title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Profesion>()

  public tipos:string[]=[]
  public estados: string[] = [];
  public profesionForm: FormGroup;

  constructor(private fb:FormBuilder, private profesionService: ProfesionService){
    this.tipos = options.profesionTipos;
    this.estados = options.estados;
  }
  ngOnInit(): void {
    this.profesionForm = this.fb.group({
      'nombre': ['', Validators.required],
      'tipo': [null, Validators.required],
      'estado': [null, Validators.required]
    });
  }
  save(){
    if(this.profesionForm.valid){
      if(this.title){
        // guardar
        this.profesionService.store(this.profesionForm.value).subscribe({
          next: (resp) => {
            let profesion: Profesion = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(profesion);
          },
          error: (err) => {}
        })
      }else{
        // actualizar
        this.profesionService.update(this.profesionForm.value).subscribe({
          next: (resp) => {
            let profesion: Profesion = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(profesion);
          },
          error:(err) =>{

          },
        })
      }
    }
  }
  edit(profesion: Profesion){
    this.profesionService.profesion = profesion;
    this.profesionForm.patchValue(profesion);
    this.stateModal = false;
  }
  onCloseModal(){
    // cerrando modal
    this.resetAll();
  }
  resetAll(){
    this.profesionForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }

}
