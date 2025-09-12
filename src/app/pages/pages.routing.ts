import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { BarriosComponent } from './gestion/barrios/barrios.component';
import { UnidadesComponent } from './gestion/unidades/unidades.component';
import { ProfesionesComponent } from './gestion/profesiones/profesiones.component';
import { ProductosComponent } from './gestion/productos/productos.component';
import { PresentacionesComponent } from './gestion/presentaciones/presentaciones.component';
import { CreateProductoComponent } from './gestion/productos/create-producto/create-producto.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './gestion/usuarios/crear-usuario/crear-usuario.component';
import { RolesComponent } from './gestion/roles/roles.component';
import { GpermisoComponent } from './gestion/roles/gpermiso/gpermiso.component';
import { PermisosComponent } from './gestion/permisos/permisos.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[authGuard],
    children: [
      { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'} },
      { path: 'grafica1', component: Grafica1Component, data:{titulo: 'Grafica'} },
      { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes de Cuenta'}},
      { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
      { path: 'usuarios/create', component: CrearUsuarioComponent, data: { titulo: 'Crear Usuario'}},
      { path: 'usuarios/edit/:id', component: CrearUsuarioComponent, data: { titulo: 'Editar Usuario'}},
      { path: 'roles', component: RolesComponent, data: { titulo: 'Roles'}},
      { path: 'roles/:id/permisos', component: GpermisoComponent, data: { titulo: 'Gestionar Permisos del Rol'}},
      { path: 'permisos', component: PermisosComponent, data: { titulo: 'Permisos'}},
      { path: 'barrios', component: BarriosComponent, data:{titulo: 'Barrios y Comunidades'}},
      { path: 'unidades', component: UnidadesComponent, data:{titulo: 'Unidades'}},
      { path: 'profesiones', component: ProfesionesComponent, data: {titulo: 'Profesiones'}},
      // { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos'}},
      { path: 'productos', children: [
        {path: '', component: ProductosComponent, data: { titulo: 'Productos'}},
        { path: 'create', component: CreateProductoComponent, data: { titulo: 'Crear Producto'}},
        { path: 'edit', component: CreateProductoComponent, data: { titulo: 'Editar Producto'}}
      ]},
      { path: 'presentaciones', component: PresentacionesComponent, data: {titulo: 'Presentaciones'}},
    ],
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

