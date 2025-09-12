import { options } from './../../../../helpers/options.helper';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { BarrioService } from '../../../../services/barrio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Barrio } from '../../../../models/barrio.model';
import {SwalHelper} from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-creaup-barrio',
  templateUrl: './creaup-barrio.component.html',
  styles: ``,
})
export class CreaupBarrioComponent implements OnInit {
  @Input({ required: true }) title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Barrio>();

  public tipos = options.barrioTipos;
  public distritos = options.barrioDistritos;
  public estados = options.estados;
  public barrioForm: FormGroup;

  constructor(private fb: FormBuilder, public barrioService: BarrioService) {}
  ngOnInit(): void {
    this.barrioForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: [null, Validators.required],
      distrito: [null, Validators.required],
      estado: ['Activo', Validators.required],
    });
    // this.barrioForm.get('estado').markAsTouched();
  }

  editar(): void {
    this.title = false;
    this.barrioForm.patchValue(this.barrioService.item);
  }
  save() {
    if (this.barrioForm.valid) {
      let barrio: Barrio = this.barrioForm.value;
      if (this.title) {
        //guardar barrio
        this.barrioService.create(barrio).subscribe({
          next: (resp) => {
            let barrio: Barrio = resp;
            this.resetAll();
            SwalHelper.showSuccess(this.barrioService.message);
            this.updateTable.emit(barrio);
          },
        });
      } else {
        this.barrioService.update(barrio).subscribe({
          next: (resp) => {
            let barrio: Barrio = resp;
            this.resetAll();
            SwalHelper.showSuccess(this.barrioService.message);
            this.updateTable.emit(barrio);
          },
        });
      }
    }
  }
  resetAll() {
    this.barrioForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
