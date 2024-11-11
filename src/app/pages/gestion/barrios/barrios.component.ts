import { Component, OnInit, ViewChild } from '@angular/core';
import { BarrioService } from '../../../services/barrio.service';
import { Barrio } from '../../../models/barrio.model';
import { ModalService } from '../../../components/services/modal.service';
import { CreaupBarrioComponent } from './creaup-barrio/creaup-barrio.component';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridAngular } from 'ag-grid-angular';
import { SwalHelper } from '../../../helpers/Swal.helper';

@Component({
  selector: 'app-barrios',
  templateUrl: './barrios.component.html',
  styles: ``,
})
export class BarriosComponent implements OnInit {
  @ViewChild(CreaupBarrioComponent) modalBarrio: CreaupBarrioComponent;
  public cargando: boolean = true;
  private selectedIndex: number = -1;
  public stateModal: boolean = true;
  public barrios = [];

  @ViewChild('gridBarrio') grid: AgGridAngular;
  localText = AG_GRID_LOCALE_ES;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];
  colDefs: ColDef[] = [
    {headerName: 'Id', field: 'id', hide: true},
    {headerName: 'Nombre', field: 'nombre'},
    {headerName: 'Tipo', field: 'tipo'},
    {headerName: 'Estado', field: 'estado'},
    {
      headerName: 'Acciones',
      cellRenderer: AccionesComponent,
      cellRendererParams: {
        onEdit: this.onEditRow.bind(this),
        onDelete: this.onDelete.bind(this),
      },
      cellClass: 'text-center'
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };

  constructor(private barrioService: BarrioService){

  }
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);
  get title(){
    return this.selectedIndex == -1 ? true : false;
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.barrioService.getAll().subscribe({
      next: (resp) => {
        this.barrios = resp;
        this.cargando = false;
      },
    })
  }
  onFilterTextBoxChanged(){
    this.grid.api.setGridOption("quickFilterText",
      (document.getElementById('filter-text') as HTMLInputElement).value);
  }
  onEditRow(field){
    this.selectedIndex = this.barrios.indexOf(field);
    this.stateModal = false;
    this.modalBarrio.editar(field);
  }
  onDelete(id: bigint){
    if(id){
      this.barrioService.delete(id).subscribe({
        next: (resp)=> {
          SwalHelper.showSuccess(resp.message);
          this.grid.api.applyTransaction({remove: [{id: id}]});
        },
        error(err){

        },
      })
    }
  }
  updateTable(barrio: Barrio){
    if(this.title){
      this.grid.api.applyTransaction({add: [barrio]});
    }else{
      let rowData = this.grid.api.applyTransaction({update: [barrio]});
    }
    this.reset();
  }
  reset(){
    this.selectedIndex = -1;
  }
}
