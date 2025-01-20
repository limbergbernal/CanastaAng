import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { options } from '../../../../helpers/options.helper';
import { Presentacion } from '../../../../models/presentacion.model';
import { Unidad } from '../../../../models/unidad.model';
import { Producto } from '../../../../models/producto.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css',
})
export class CreateProductoComponent implements OnInit {
    @Input() title: boolean = true;
    public cargando: boolean = true;
    public productoForm: FormGroup;
    public estados: string[] = options.estados;
    public presentaciones: Presentacion[] = [];
    public unidades: Unidad[] = [];

    constructor(private productoService: ProductoService, private fb: FormBuilder, private router: Router){

    }
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      'nombre': ["", Validators.required],
      'peso' : ["", Validators.required],
      'estado': [null, Validators.required],
      'unidad_id': [null, Validators.required],
      'presentacion_id': [null, Validators.required],
    });
    this.cargando = false;
    this.load();
  }
  load():void{
    this.productoService.getPresentaciones().subscribe({
      next:(resp)=>{
        this.presentaciones = resp.data;
      }
    });
    this.productoService.getUnidades().subscribe({
      next: (resp) => {
        this.unidades = resp.data;
      }
    })
  }

  save(): void{
    if(this.productoForm.valid){
      if(this.title){
        // create
        this.productoService.create(this.productoForm.value).subscribe({
          next: (resp) => {
            let producto: Producto = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
          }
        })
      }else{
        //update
        this.productoService.update(this.productoForm.value).subscribe({
          next: (resp)=> {
            let producto: Producto = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
          }
        })
      }
    }
  }
  cancel(): void{
    this.resetAll();
    this.router.navigateByUrl('/dashboard/productos',{state: {data: {titulo: "Crear Producto"}}});
  }
  resetAll(): void{
    this.title = true;
    this.productoForm.reset();
  }
}
