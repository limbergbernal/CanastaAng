import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { Component, ViewChild } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { AccionesComponent } from '../../../components/table/profesion/acciones/acciones.component';
import { ProductoService } from '../../../services/producto.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Producto } from '../../../models/producto.model';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: ``
})
export class ProductosComponent {

  @ViewChild(ModalProductoComponent) modalProducto: ModalProductoComponent
  public productos: any[] = [];
  public cargando: boolean = true;
  public stateModal: boolean = true;
  public selectedIndex = false;

  // VARIABLES AG-GRID
  @ViewChild('gridProducto') grid: AgGridAngular;
  localText = AG_GRID_LOCALE_ES;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[]| boolean = [10,20,50,100];
  colDefs: ColDef[] = [
    { headerName: "Id", field: 'id', hide: true},
    { headerName: "Nombre", field: 'nombre'},
    { headerName: "Peso", field: 'peso'},
    { headerName: "Unidad", field: 'unidad.nombre'},
    { headerName: "Presentacion", field: 'presentacion.nombre'},
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
  constructor(private productoService: ProductoService, private router: Router){
    this.loadData();
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => String(params.data.id);

  get title(){
    return !this.selectedIndex;
  }
  loadData(): void{
    this.productoService.getAll().subscribe({
      next: (resp)=>{
        this.productos = resp.data;
        this.cargando = false;
      }
    })
  }
  onFilterTextChanged(){
    this.grid.api.setGridOption("quickFilterText", (document.getElementById('filter-text') as HTMLInputElement).value);
  }

  onEditRow(fields): void{
    this.selectedIndex = true;
    this.stateModal = false;
    this.modalProducto.editar(fields);
  }
  onDelete(id: bigint): void{

  }
  updateTable(producto: Producto): void{
    if(this.title){
      this.grid.api.applyTransaction({add: [producto]});
    }else{
      this.grid.api.applyTransaction({update: [ producto]});
    }
    this.reset();
  }
  createProducto(): void{
    this.router.navigate(['dashboard/productos/create'],{state: {data: { titulo: "HOlas t"}}});
  }
  reset(): void{
    this.selectedIndex = false;
  }
}
