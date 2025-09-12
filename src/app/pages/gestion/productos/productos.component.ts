import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { ProductoService } from '../../../services/producto.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Producto } from '../../../models/producto.model';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { Router } from '@angular/router';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { SwalHelper } from '../../../helpers/Swal.helper';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: ``
})
export class ProductosComponent extends GridBaseComponent<Producto> implements OnInit {

  public cargando: boolean = true;
  public productos: Producto[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild("modalProducto") modalProducto: ModalProductoComponent;
  // VARIABLES AG-GRID
  @ViewChild('gridProducto') grid: AgGridAngular;

  constructor(private productoService: ProductoService){
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
      { headerName: "Id", field: 'id', hide: true},
      { headerName: "Nombre", field: 'nombre'},
      { headerName: "Peso", field: 'peso'},
      { headerName: "Unidad", field: 'unidad.nombre'},
      { headerName: "Presentacion", field: 'presentacion.nombre'},
      { headerName: "Estado", field: 'estado'},
    ];
  }
  getRowData(): any{
    return new Promise((resolve) => {
      this.productoService.getAll().subscribe({
        next: (resp: any) =>{
          this.productos = resp.data;
          resolve(resp);
        }
      });
    });
  }
  override onEdit(rowData: any): void {
    if(rowData){
      this.selectedIndex = true;
      this.stateModal = false;
      this.productoService.item = rowData;
      this.grid.api.forEachNode((node) => {
        if(node.data.id === rowData.id){
          node.setSelected(true);
          this.modalProducto.editar();
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
          this.productoService.delete(id).subscribe({
            next: (resp) => {
              SwalHelper.showSuccess(resp.message);
              this.grid.api.applyTransaction({ remove: [rowData]});
            }
          })
        }
      });
    }
  }
  override onFilterTextChanged(event: any): void {
    if(this.grid.api){
      this.grid.api.setGridOption('quickFilterText', (document.getElementById('filter-text') as HTMLInputElement).value)
    }
  }
  get title(){
    return !this.selectedIndex;
  }

  newProducto(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.productoService.item = null;
    this.grid.api.forEachNode((node) => {
      node.setSelected(false);
    });
  }

  updateTable(producto: Producto):void {
    if (this.title) {
      this.grid.api.applyTransaction({ add: [producto] });
    } else {
      this.grid.api.applyTransaction({ update: [producto] });
    }
    this.selectedIndex = false;
  }
}
