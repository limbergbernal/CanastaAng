
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent } from 'ag-grid-community';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesionService } from '../../../services/profesion.service';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';
import { Profesion } from '../../../models/profesion.model';
import { ModalProfesionComponent } from './modal-profesion/modal-profesion.component';
import { AgGridAngular } from 'ag-grid-angular';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';


@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styles: ``,
})
export class ProfesionesComponent implements OnInit {
  @ViewChild(ModalProfesionComponent) modalProfesion: ModalProfesionComponent;
  // Row Data: The data to be displayed.
  @ViewChild('gridProfesion') grid!: AgGridAngular;
  localText = AG_GRID_LOCALE_ES;
  rowData:Profesion[] = [];
  cargando: boolean = true;
  private selectedIndex: number = -1;
  public stateModal: boolean = true;

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {headerName: "Id", field: 'id', hide: true},
    {headerName:'Nombre', field: 'nombre', flex: 2 },
    { headerName: "Tipo", field: 'tipo' },
    { headerName:"Estado", field: 'estado',editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
          values: ['Activo', 'Inactivo'],
      },
    },
    { headerName: 'Acciones', flex: 1, cellRenderer: AccionesComponent,
      cellRendererParams:{
        onEdit: this.onEditRow.bind(this),
        onDelete: this.onDelete.bind(this),
    },
    cellClass: 'text-center'
  },
  ];
  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);

  get title(){
    return this.selectedIndex == -1 ? true : false;
  }
  constructor(private profesionService: ProfesionService){

  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.profesionService.getAll().subscribe({
      next: (resp)=>{
        this.rowData = resp.data;
        this.cargando = false;
      },
      error:(err)=>{

      }
    })
  }
  onEditRow(field){
    // console.log(field);
    this.selectedIndex = this.rowData.indexOf(field);
    this.stateModal = false;
    this.modalProfesion.edit(field);
  }
  onDelete(id: bigint){
    if(id){
      this.profesionService.delete(id).subscribe({
        next: (resp)=>{
          SwalHelper.showSuccess(resp.message);
          this.grid.api.applyTransaction({remove: [{id: id}]})
        },
        error(err) {

        },
      })
    }
  }
  updateTable(profesion: any){
    if(this.selectedIndex == -1 ){
      SwalHelper.showSuccess("Guardado exitosamente.");
      this.grid.api.applyTransaction({add: [profesion] });
    }else{
      SwalHelper.showSuccess("Actualizado exitosamente.");
      let rowdata = this.grid.api.applyTransaction({update: [profesion]});
    }
  }
}

