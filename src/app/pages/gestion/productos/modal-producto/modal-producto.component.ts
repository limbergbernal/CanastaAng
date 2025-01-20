import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { Producto, ProductoPost } from '../../../../models/producto.model';
import { ProductoService } from '../../../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { options } from '../../../../helpers/options.helper';
import { Unidad } from '../../../../models/unidad.model';
import { Presentacion } from '../../../../models/presentacion.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styles: ``
})
export class ModalProductoComponent implements OnInit{

  @Input({required: true}) title: boolean = true;
  @Input() stateModal: boolean = true;
  @Output() stateModalChange = new EventEmitter<boolean>();
  updateTable = output<Producto>();

  public estados: string[] = options.estados;
  public unidades: Unidad[] = [];
  public presentaciones: Presentacion[] = [];
  public productoForm: FormGroup;

  constructor(private productoService: ProductoService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      'nombre': ["", Validators.required],
      'peso': ["", Validators.required],
      'estado': [null, Validators.required],
      'unidad_id': [null, Validators.required],
      'presentacion_id': [null, Validators.required],
    });
    this.load();
  }
  load(){
    this.productoService.getPresentaciones().subscribe({
      next: (resp) => {
        this.presentaciones = resp.data;
      
      }
    });
    this.productoService.getUnidades().subscribe({
      next: (resp)=> {
        this.unidades = resp.data;
      }
    })
  }

  editar(producto: Producto): void{
    this.productoService.producto = producto;
    this.productoForm.patchValue(producto);
  }

  save(): void{
    if(this.productoForm.valid){
      if(this.title){
        this.productoService.create(this.productoForm.value).subscribe({
          next: (resp) =>{
            let producto: Producto = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(producto);
          }
        });
      }else{
        this.productoService.update(this.productoForm.value).subscribe({
          next: (resp) => {
            let producto: Producto = resp.data;
            this.resetAll();
            SwalHelper.showSuccess(resp.message);
            this.updateTable.emit(producto);
          }
        });
      }
    }
  }
  resetAll(): void{
    this.title = true;
    this.productoForm.reset();
    this.stateModalChange.emit(!this.stateModal);
  }
}
