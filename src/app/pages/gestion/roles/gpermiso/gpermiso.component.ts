import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, catchError } from 'rxjs';
import { RolService } from '../../../../services/rol.service';
import { Permiso } from '../../../../models/permiso.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-gpermiso',
  templateUrl: './gpermiso.component.html',
  styles: ``
})
export class GpermisoComponent implements OnInit {

  public cargando = true;
  private rolId: string;
  public rol: any = null;
  public permisos: Permiso[] = [];
  public permisosAsignados: number[] = [];
  constructor(private route: ActivatedRoute, private rolService: RolService){

  }
  ngOnInit(): void {
    this.rolId = this.route.snapshot.paramMap.get('id');
    this.loadDataInit();
  }

  loadDataInit(): void{
    forkJoin({
      rol: this.rolService.getById(Number(this.rolId)),
      permisos: this.rolService.getPermisos()
    }).subscribe({
      next: (resp)=>{
        this.rol = resp.rol;
        this.permisos = resp.permisos;
        this.cargando = false;
        this.permisosAsignados = (this.rol.data.permissions).map((permiso)=> permiso.id);

      },
      error: (err) => {
        SwalHelper.showError('Error','No se puedo cargar la informacion.');
        console.log(err);
      }
    });


  }
  onChange(permisoId: number|bigint, event): void{
    let isChecked = event.target.checked;
    if(isChecked){
      this.permisosAsignados.push(Number(permisoId));
    }else{
      this.permisosAsignados = this.permisosAsignados.filter(id => id !== permisoId);
    }
  }
  guardar(): void{
    this.rolService.asignarRoles(this.rolId, this.permisosAsignados).subscribe({
      next: (resp) => {
        SwalHelper.showSuccess('Exito', 'Permisos asignados correctamente.');
      },error: (err) => {
        SwalHelper.showError('Error', 'No se puedo guardar la informacion.')
      }
    })
  }

}
