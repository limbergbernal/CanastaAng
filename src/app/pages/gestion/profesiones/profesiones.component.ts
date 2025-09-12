
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent } from 'ag-grid-community';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesionService } from '../../../services/profesion.service';
import { Profesion } from '../../../models/profesion.model';
import { ModalProfesionComponent } from './modal-profesion/modal-profesion.component';
import { AgGridAngular } from 'ag-grid-angular';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { GridBaseComponent } from '../../../components/table/grid-base.component';


@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styles: ``,
})
export class ProfesionesComponent extends GridBaseComponent<Profesion> implements OnInit {

  public cargando: boolean = true;
  public profesiones: Profesion[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild(ModalProfesionComponent) modalProfesion: ModalProfesionComponent;

  // VARIABLES AG_GRID
  @ViewChild('gridProfesiones') grid: AgGridAngular;

  constructor(private profesionService: ProfesionService){
    super();
  }
  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons([ 'edit', 'delete']);
  }
  override initializeGrid(): void {
    this.columnDefs = this.getColumnDefinitions();
    this.getRowData().then((resp) => {
      this.cargando = false;
      this.setRowData(resp);
    }).catch((err) => {
      SwalHelper.showError('Error al cargar los datos de profesiones.');
    });
    this.enableActionColumn();
  }
  override getColumnDefinitions(): ColDef[] {
    return [
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'Nombre', field: 'nombre'},
      { headerName: 'Tipo', field: 'tipo'},
      { headerName: 'Estado', field: 'estado'}
    ];
  }
  override onEdit(rowData: any): void {
    if(rowData){
      this.selectedIndex = true;
      this.stateModal = false;
      this.profesionService.item = rowData;
      this.grid.api.forEachNode((node) => {
        if( node.data.id === rowData.id){
          node.setSelected(true);
          this.modalProfesion.editar();
        }else{
          node.setSelected(false);
        }
      })
    }
  }
  override onDelete(rowData: any): void {
    if(rowData){
      const id = rowData.id;
      SwalHelper.showDialog().then((confirm) => {
        if(confirm){
          this.profesionService.delete(id).subscribe({
            next: (resp) => {
              SwalHelper.showSuccess(resp.message);
              this.grid.api.applyTransaction({ remove: [rowData]});
            },
            error: (err) =>{
              SwalHelper.showError('Error al eliminar la profesión.');
            }
          })
        }
      })
    }
  }
  override onFilterTextChanged(event: any): void {
    if(this.grid.api){
      this.grid.api.setGridOption('quickFilterText', (document.getElementById('filter-text') as HTMLInputElement).value);
    }
  }

  get title() {
    return !this.selectedIndex;
  }
  getRowData(): any{
    return new Promise((resolve) => {
      this.profesionService.getAll().subscribe({
        next: (resp: any) =>{
          this.profesiones = resp.data;
          resolve(resp);
        },
        error: (err) => {
          resolve([]);
        }
      })
    });
  }
  newProfesion(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.profesionService.item = null;
  }
  updateTable(profesion: Profesion): void{
    if(this.title){
      this.grid.api.applyTransaction({ add: [profesion]});
    }else{
      this.grid.api.applyTransaction({ update: [profesion]});
    }
    this.selectedIndex = false;
  }
}

