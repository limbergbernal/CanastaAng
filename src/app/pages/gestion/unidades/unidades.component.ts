import { UnidadService } from './../../../services/unidad.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unidad } from '../../../models/unidad.model';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CreaupUnidadComponent } from './creaup-unidad/creaup-unidad.component';
import { SwalHelper } from '../../../helpers/Swal.helper';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styles: ``
})
export class UnidadesComponent extends GridBaseComponent<Unidad> implements OnInit {

  public cargando: boolean = true;
  public unidades: Unidad[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild('modalUnidad') modalUnidad: CreaupUnidadComponent;

  @ViewChild('gridUnidad') grid: AgGridAngular;
  constructor(private unidadService: UnidadService){
    super();
  }

  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons(['edit', 'delete']);
  }
  override initializeGrid(): void {
    this.columnDefs = this.getColumnDefinitions();
    this.getRowData().then((resp) => {
      this.setRowData(resp);
      this.cargando = false;
    });
    this.enableActionColumn();
  }
  override getColumnDefinitions(): ColDef[] {
    return [
      { headerName: 'Id', field: 'id', hide: true},
      { headerName: 'Nombre', field: 'nombre'},
      { headerName: 'Abreviacion', field: 'abreviacion'},
      { headerName: 'Estado', field: 'estado'},
    ];
  }
  override onEdit(rowData: any): void {
    if(rowData){
      this.selectedIndex = true;
      this.stateModal = false;
      this.unidadService.item = rowData;
      this.grid.api.forEachNode((node) =>{
        if(node.data.id === rowData.id){
          node.setSelected(true);
          this.modalUnidad.editar();
        }else{
          node.setSelected(false);
        }
      })
    }
  }
  override onDelete(rowData: any): void {
    if(rowData){
      const id = rowData.id;
      SwalHelper.showDialog().then((confirm) =>{
        if(confirm){
          this.unidadService.delete(id).subscribe({
            next: (resp) => {
              SwalHelper.showSuccess(resp.message);
              this.grid.api.applyTransaction({remove: [rowData]})
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

  getRowData(): any{
    return new Promise((resolve) => {
      this.unidadService.getAll().subscribe({
        next: (resp:any) => {
          this.unidades = resp.data;
          resolve(resp);
        }
      })
    });
  }
  get title(){
    return !this.selectedIndex;
  }

  newUnidad(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.unidadService.item = null;
    this.grid.api.forEachNode((node) =>{
      node.setSelected(false);
    });
  }

  updateTable(unidad: Unidad): void {
    if(this.title){
      this.grid.api.applyTransaction({ add: [unidad] });
    }else{
      this.grid.api.applyTransaction({ update: [unidad] });
    }
    this.selectedIndex = false;
  }

}
