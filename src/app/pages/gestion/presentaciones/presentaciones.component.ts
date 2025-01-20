import { Component, ViewChild } from '@angular/core';
import { ModalPresentacionComponent } from './modal-presentacion/modal-presentacion.component';
import { Presentacion } from '../../../models/presentacion.model';
import { AgGridAngular } from 'ag-grid-angular';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';
import { PresentacionService } from '../../../services/presentacion.service';
import { SwalHelper } from '../../../helpers/Swal.helper';

@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styles: ``
})
export class PresentacionesComponent {
  @ViewChild(ModalPresentacionComponent) modalPresentacion: ModalPresentacionComponent;
  public cargando: boolean = true;
  public presentaciones: Presentacion[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  // VARIABLES AG-GRID
  @ViewChild('gridPresentacion') grid: AgGridAngular;
  localText = AG_GRID_LOCALE_ES;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10,20,50,100];
  colDefs: ColDef[] = [
    { headerName: "Id", field: 'id', hide: true},
    { headerName: "Nombre", field: 'nombre'},
    { headerName: "Abreviacion", field: 'abreviacion'},
    { headerName: "Estado", field: 'estado'},
    {
      headerName: 'Acciones',
      cellRenderer: AccionesComponent,
      cellRendererParams: {
        onEdit: this.onEditRow.bind(this),
        onDelete: this.onDelete.bind(this),
      },
      cellClass: 'text-center'
    }
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  }
  constructor(private presentacionService: PresentacionService){

  }
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => String(params.data.id);

  get title(){
    return !this.selectedIndex;
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.presentacionService.getAll().subscribe({
      next: (resp)=>{
        this.presentaciones = resp.data;
        this.cargando = false;
      }
    })
  }
  onFilterTextChanged(){
    this.grid.api.setGridOption("quickFilterText", (document.getElementById('filter-text') as HTMLInputElement).value);
  }
  updateTable(presentacion: Presentacion):void{
    if(this.title){
      this.grid.api.applyTransaction({add: [presentacion]});
    }else{
      this.grid.api.applyTransaction({update: [ presentacion]});
    }
    this.reset();
  }
  onEditRow(field):void{
    this.selectedIndex = true;
    this.stateModal = false;
    this.modalPresentacion.editar(field);
  }
  onDelete(id: bigint):void{
    if(id){
      this.presentacionService.delete(id).subscribe({
        next: (resp)=>{
          SwalHelper.showSuccess(resp.message);
          this.grid.api.applyTransaction({remove: [{id: id}]})
        }
      })
    }
  }

  reset(): void{
    this.selectedIndex = false;
  }
}
