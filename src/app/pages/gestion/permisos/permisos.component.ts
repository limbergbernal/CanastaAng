import { Component, OnInit } from '@angular/core';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { Permiso } from '../../../models/permiso.model';
import { ColDef } from 'ag-grid-community';
import { PermisoService } from '../../../services/permiso.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: ``
})
export class PermisosComponent extends GridBaseComponent<Permiso> implements OnInit{

  public cargando: boolean = true;
  public permisos: Permiso[] = [];
  constructor(private permisoService: PermisoService){
    super();
  }
  ngOnInit(): void {
    this.initializeGrid();
    this.addActionButtons(['edit', 'delete']);
  }

  override initializeGrid(): void {
    this.columnDefs = this.getColumnDefinitions();
    this.getRowData().then
  }
  override getColumnDefinitions(): ColDef[] {
    throw new Error('Method not implemented.');
  }
  override onEdit(rowData: any): void {
    throw new Error('Method not implemented.');
  }
  override onDelete(rowData: any): void {
    throw new Error('Method not implemented.');
  }
  override onFilterTextChanged(event: any): void {
    throw new Error('Method not implemented.');
  }

  getRowData(): any{
    return new Promise((resolve) => {
      this.permisoService.getAll().subscribe({
        next: (resp: any) => {
          this.permisos = resp.data;
          resolve(resp);
        }
      })
    });
  }
  newPermiso(): void{

  }
}
