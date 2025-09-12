import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalPresentacionComponent } from './modal-presentacion/modal-presentacion.component';
import { Presentacion} from '../../../models/presentacion.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef} from 'ag-grid-community';
import { PresentacionService } from '../../../services/presentacion.service';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { GridBaseComponent } from '../../../components/table/grid-base.component';

@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styles: ``,
})
export class PresentacionesComponent extends GridBaseComponent<Presentacion> implements OnInit
{
  public cargando: boolean = true;
  public presentaciones: Presentacion[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild(ModalPresentacionComponent) modalPresentacion: ModalPresentacionComponent;

  // VARIABLES AG-GRID
  @ViewChild('gridPresentacion') grid: AgGridAngular;
  constructor(private presentacionService: PresentacionService) {
    super();
  }
  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons(['edit', 'delete']);
  }

  initializeGrid(): void {
    this.columnDefs = this.getColumnDefinitions();
    this.getRowData().then((resp) => {
      this.setRowData(resp);
      this.cargando = false;
    });
  }

  getColumnDefinitions(): ColDef[] {
    return [
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'Nombre', field: 'nombre' },
      { headerName: 'Abreviacion', field: 'abreviacion' },
      { headerName: 'Estado', field: 'estado' },
    ];
  }

  getRowData(): any {
    return new Promise((resolve) => {
      this.presentacionService.getAll().subscribe({
        next: (resp: any) => {
          this.presentaciones = resp.data;
          resolve(resp);
        },
      });
    });
  }

  override onEdit(rowData: any): void {
    if(rowData){
      this.selectedIndex = true;
      this.stateModal = false;
      this.presentacionService.item = rowData;
      this.grid.api.forEachNode((node) => {
        if (node.data.id === rowData.id) {
          node.setSelected(true);
          this.modalPresentacion.editar();
        } else {
          node.setSelected(false);
        }
      });
    }
  }
  override onDelete(rowData: any): void {
    if(rowData){
      const id = rowData.id;
      SwalHelper.showDialog().then((confirm)=>{
        if(confirm){
          this.presentacionService.delete(id).subscribe({
            next: (resp)=>{
              SwalHelper.showSuccess(resp.message);
              this.grid.api.applyTransaction({remove: [{id: id}]});
            }
          });

        }
      })
    }
  }
  override onFilterTextChanged(event: any): void {
    if(this.grid.api){
      this.grid.api.setGridOption('quickFilterText', (document.getElementById('filter-text') as HTMLInputElement).value)
    }
  }

  get title() {
    return !this.selectedIndex;
  }

  newPresentacion(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.presentacionService.item = null;
    this.grid.api.forEachNode((node) => {
      node.setSelected(false);
    });
  }
  updateTable(presentacion: Presentacion):void {
    if (this.title) {
      this.grid.api.applyTransaction({ add: [presentacion] });
    } else {
      this.grid.api.applyTransaction({ update: [presentacion] });
    }
    this.selectedIndex = false;
  }
}
