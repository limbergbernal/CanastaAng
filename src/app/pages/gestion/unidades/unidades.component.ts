import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadService } from '../../../services/unidad.service';
import { Unidad, UnidadPost } from '../../../models/unidad.model';
import { CreaupUnidadComponent } from './creaup-unidad/creaup-unidad.component';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridAngular } from 'ag-grid-angular';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: ``
})
export class UnidadesComponent implements OnInit {

  @ViewChild(CreaupUnidadComponent) modalUnidad: CreaupUnidadComponent;
  public cargando: boolean = true;
  public unidades: Unidad[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  // VARIABLES AG-GRID
  @ViewChild('gridUnidad') grid: AgGridAngular;
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
  constructor(private unidadService: UnidadService){

  }
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => String(params.data.id);

  get title(){
    return !this.selectedIndex;
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.unidadService.getAll().subscribe({
      next: (resp)=>{
        this.unidades = resp.data;
        this.cargando = false;
      }
    })
  }
  onFilterTextChanged(){
    this.grid.api.setGridOption("quickFilterText", (document.getElementById('filter-text') as HTMLInputElement).value);
  }
  updateTable(unidad: Unidad):void{
    if(this.title){
      this.grid.api.applyTransaction({add: [unidad]});
    }else{
      this.grid.api.applyTransaction({update: [ unidad]});
    }
    this.reset();
  }
  onEditRow(field):void{
    this.selectedIndex =true;
    this.stateModal = false;
    this.modalUnidad.editar(field);
  }
  onDelete(id: bigint):void{
    if(id){
      this.unidadService.delete(id).subscribe({
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
