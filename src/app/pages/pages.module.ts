import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { BarriosComponent } from './gestion/barrios/barrios.component';
import { ComponentsModule } from "../components/components.module";
import { CreaupBarrioComponent } from './gestion/barrios/creaup-barrio/creaup-barrio.component';
import { UnidadesComponent } from './gestion/unidades/unidades.component';
import { CreaupUnidadComponent } from './gestion/unidades/creaup-unidad/creaup-unidad.component';
import { ProfesionesComponent } from './gestion/profesiones/profesiones.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalProfesionComponent } from './gestion/profesiones/modal-profesion/modal-profesion.component';
import { ProductosComponent } from './gestion/productos/productos.component';
import { ModalProductoComponent } from './gestion/productos/modal-producto/modal-producto.component';
import { PresentacionesComponent } from './gestion/presentaciones/presentaciones.component';
import { ModalPresentacionComponent } from './gestion/presentaciones/modal-presentacion/modal-presentacion.component';
import { CreateProductoComponent } from './gestion/productos/create-producto/create-producto.component';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { ModalUsuarioComponent } from './gestion/usuarios/modal-usuario/modal-usuario.component';
import { CrearUsuarioComponent } from './gestion/usuarios/crear-usuario/crear-usuario.component';
import { RolesComponent } from './gestion/roles/roles.component';
import { ModalRolComponent } from './gestion/roles/modal-rol/modal-rol.component';
import { GpermisoComponent } from './gestion/roles/gpermiso/gpermiso.component';
import { PermisosComponent } from './gestion/permisos/permisos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    RxjsComponent,
    UsuariosComponent,
    BarriosComponent,
    CreaupBarrioComponent,
    UnidadesComponent,
    CreaupUnidadComponent,
    ProfesionesComponent,
    ModalProfesionComponent,
    ProductosComponent,
    ModalProductoComponent,
    PresentacionesComponent,
    ModalPresentacionComponent,
    CreateProductoComponent,
    ModalUsuarioComponent,
    CrearUsuarioComponent,
    RolesComponent,
    ModalRolComponent,
    GpermisoComponent,
    PermisosComponent,

  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent
]
})
export class PagesModule { }
