import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Profesion } from '../../../../models/profesion.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-profesion-acciones',
  standalone: true,
  imports: [],
  templateUrl: './acciones.component.html',
  styles: ``
})
export class AccionesComponent implements ICellRendererAngularComp {
  rowProfesion: Profesion;
  private params: any;
  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams): boolean {
    this.rowProfesion = params.data;
    this.params = params;
    return true;
  }
  onClickEdit(){
    this.params.onEdit(this.rowProfesion);
  }
  onDelete(){
    SwalHelper.showDialog().then((confirm)=>{
      if(confirm){
        this.params.onDelete(this.rowProfesion.id);

      }
    })
  }
}
