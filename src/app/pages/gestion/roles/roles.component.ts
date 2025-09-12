import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from '../../../models/rol.model';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { ColDef } from 'ag-grid-community';
import { RolService } from '../../../services/rol.service';
import { AgGridAngular } from 'ag-grid-angular';
import { SwalHelper } from '../../../helpers/Swal.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: ``
})
export class RolesComponent extends GridBaseComponent<Rol> implements OnInit{
  public cargando: boolean = true;
  public roles: Rol[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;

  @ViewChild('gridRol') grid: AgGridAngular;

  constructor(private rolService: RolService, private router: Router){
    super();
  }
  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons(['edit', 'delete', 'addpermisos']);
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
      { headerName: 'Nombre', field: 'name'},
      // { headerName: 'Permisos', field: 'permissions', valueFormatter: (params) => params.value.map(permiso => permiso.name).join(', ') },
      { headerName: 'Permisos', field: 'permissions',
        cellRenderer: (params) => {
           if (!params.value || !Array.isArray(params.value) || !params.value.length ) return 'Ninguno';
          return params.value.map(permiso => `<span class="badge badge-info p-2">${permiso.name}</span>`)
          .join(' ');
        }
       },
    ];
  }
  getRowData(): any{
    return new Promise((resolve) => {
      this.rolService.getAll().subscribe({
        next: (resp: any) => {
          this.roles = resp.data;
          resolve(resp);
        }
      });
    })
  }
  override onEdit(rowData: any): void {
    throw new Error('Method not implemented.');
  }
  override onDelete(rowData: any): void {
    if(rowData){
      const id = rowData.id;
      SwalHelper.showDialog().then((confirm) =>{
        if(confirm){
          this.rolService.delete(id).subscribe({
            next: (resp) =>{
              SwalHelper.showSuccess(resp.message);
              this.grid.api.applyTransaction({ remove: [{id: id}]});
            }
          })
        }
      });
    }
  }

  override onFilterTextChanged(event: any): void {
    if(this.grid.api){
      this.grid.api.setGridOption('quickFilterText', (document.getElementById('filter-text') as HTMLInputElement).value);
    }
  }

  onAddPermisos(rowData: any): void{
    // console.log("id del Rol", rowData.id);
    if(rowData){
      this.router.navigateByUrl(`dashboard/roles/${rowData.id}/permisos`);
    }
  }

  get title(){
    return !this.selectedIndex;
  }

  newRol(): void{
    this.selectedIndex = false;
    this.stateModal = false;
    this.rolService.item = null;
    this.grid.api.forEachNode((node) => {
      node.setSelected(false);
    });
  }
  updateTable(rol: Rol):void {
    if (this.title) {
      this.grid.api.applyTransaction({ add: [rol] });
    } else {
      this.grid.api.applyTransaction({ update: [rol] });
    }
    this.selectedIndex = false;
  }



}
