import { Component, OnInit, ViewChild } from '@angular/core';
import { BarrioService } from '../../../services/barrio.service';
import { Barrio } from '../../../models/barrio.model';
import { CreaupBarrioComponent } from './creaup-barrio/creaup-barrio.component';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridAngular } from 'ag-grid-angular';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { resolve } from 'path';

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styles: ``,
})
export class BarriosComponent extends GridBaseComponent<Barrio> implements OnInit{

  public cargando: boolean = true;
  public barrios: Barrio[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild('modalBarrio') modalBarrio: CreaupBarrioComponent;

  // VARIABLES AG-GRID
  @ViewChild('gridBarrio') grid: AgGridAngular;

  constructor(private barrioService: BarrioService){
    super();
  }
  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons(['edit', 'delete']);
  }
  override initializeGrid(): void {
    this.columnDefs = this.getColumnDefinitions();
    this.getRowData().then((resp) =>{
      this.setRowData(resp);
      this.cargando = false;
    })
    this.enableActionColumn();
  }
  override getColumnDefinitions(): ColDef[] {
    return [
      { headerName: 'Id', field: 'id', hide: true},
      { headerName: 'Nombre', field: 'nombre'},
      { headerName: 'Tipo', field: 'tipo'},
      { headerName: 'Distrito', field: 'distrito'},
      { headerName: 'Estado', field: 'estado'},
    ];
  }
  override onFilterTextChanged(event: any): void {
    if(this.grid.api){
      this.grid.api.setGridOption('quickFilterText', (document.getElementById('filter-text') as HTMLInputElement).value)
    }
  }

  getRowData(): any{
    return new Promise((resolve) => {
      this.barrioService.getAll().subscribe({
        next: (resp: any) =>{
          this.barrios = resp.data;
          resolve(resp);
        }
      })
    })
  }

  override onEdit(rowData: any): void {
    if(rowData){
      this.selectedIndex = true;
      this.stateModal = false;
      this.barrioService.item = rowData;
      this.grid.api.forEachNode((node) =>{
        if(node.data.id == rowData.id){
          node.setSelected(true);
          this.modalBarrio.editar();
        }else{
          node.setSelected(false);
        }
      });
    }
  }
  override onDelete(rowData: any): void {
    if(rowData){
      const id = rowData.id;
      SwalHelper.showDialog().then((confirm) =>{
        if(confirm){
          this.barrioService.delete(id).subscribe({
            next: (resp) =>{
              SwalHelper.showSuccess(resp.message);
              // this.grid.api.applyTransaction({ remove: [{id: id}]});
              this.grid.api.applyTransaction({ remove: [rowData]});
            }
          });
        }
      });
    }
  }

  get title(){
    return !this.selectedIndex;
  }

  newBarrio(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.barrioService.item = null;
    this.grid.api.forEachNode((node) =>{
      node.setSelected(false);
    });
  }

  updateTable(barrio: Barrio): void{
    if(this.title){
      this.grid.api.applyTransaction({ add: [barrio]});
    }else{
      this.grid.api.applyTransaction({ update: [barrio]});
    }
    this.selectedIndex = false;
  }

}
