import { Component, inject, OnInit } from '@angular/core';
import { GridBaseComponent } from '../../../components/table/grid-base.component';
import { Usuario } from '../../../models/usuario.model';
import { ColDef } from 'ag-grid-community';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent extends GridBaseComponent<Usuario> implements OnInit{
  private router = inject(Router);

  public cargando: boolean = true;
  public usuarios: Usuario[] = [];
  public stateModal: boolean = true;
  public selectedIndex = false;
  constructor(private usuarioService: UsuarioService){
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
      { headerName: 'Id', field: 'id', hide: true },
      { headerName: 'Nombre Completo', field: 'nombre_completo'},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Username', field: 'username' },
      { headerName: 'Estado', field: 'estado' },
    ];
  }
  getRowData(): any {
    return new Promise((resolve) => {
      this.usuarioService.getAll().subscribe({
        next: (resp: any) => {
          this.usuarios = resp.data;
          resolve(resp);
        },
      });
    });
  }
  override onEdit(rowData: any): void {
    const id = rowData.id;
    this.router.navigate(['dashboard/usuarios/edit', id]);
    console.log(rowData.id);
  }
  override onDelete(rowData: any): void {
    throw new Error('Method not implemented.');
  }
  override onFilterTextChanged(event: any): void {
    throw new Error('Method not implemented.');
  }

  get title(): boolean {
    return !this.stateModal;
  }
  newUsuario(): void{
    this.selectedIndex = false;
    this.stateModal = false;

  }
   updateTable(usuario: Usuario):void {
    if (this.title) {
      // this.grid.api.applyTransaction({ add: [presentacion] });
    } else {
      // this.grid.api.applyTransaction({ update: [presentacion] });
    }
    this.selectedIndex = false;
  }

}
