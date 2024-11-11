import { options } from './../../../../helpers/options.helper';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { BarrioService } from '../../../../services/barrio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Barrio } from '../../../../models/barrio.model';
import {SwalHelper} from '../../../../helpers/Swal.helper';


const ti = { ...options };

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

  editar(barrio: Barrio): void {
    this.barrioService.barrio = barrio;
    this.barrioForm.patchValue(barrio);
    this.stateModal = false;
    // this.barrioForm.get('estado').setValidators(Validators.required);
  }
  save() {
    if (this.barrioForm.valid) {
      let barrio: Barrio = this.barrioForm.value;
      if (this.title) {
        //guardar barrio
        this.barrioService.create(barrio).subscribe({
          next: (resp) => {
            let barrio: Barrio = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(barrio);
          },
        });
      } else {
        this.barrioService.update(barrio).subscribe({
          next: (resp) => {
            let barrio: Barrio = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
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
