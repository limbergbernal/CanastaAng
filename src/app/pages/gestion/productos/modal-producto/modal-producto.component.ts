import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { Producto, ProductoPost } from '../../../../models/producto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { options } from '../../../../helpers/options.helper';
import { Unidad } from '../../../../models/unidad.model';
import { Presentacion } from '../../../../models/presentacion.model';
import { SwalHelper } from '../../../../helpers/Swal.helper';
import { ProductoService } from '../../../../services/producto.service';
import { FormErrorService } from '../../../../components/services/form-error.service';
import { forkJoin } from 'rxjs';
import { UnidadService } from '../../../../services/unidad.service';
import { PresentacionService } from '../../../../services/presentacion.service';

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
  public unidades: [] = [];
  public presentaciones: [] = [];
  public productoForm: FormGroup;
  public FormErrorHelper = FormErrorService;

  constructor(public productoService: ProductoService,
    private unidadService: UnidadService,
    private presentacionService: PresentacionService,
    private fb: FormBuilder
  ){

  }
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ["", Validators.required],
      peso: ["", Validators.required],
      unidad_id: [null, Validators.required],
      presentacion_id: [null, Validators.required],
      estado: [null, Validators.required],
    });
    this.loadDataInit();
  }

  loadDataInit(): void{
    forkJoin({
      unidades: this.unidadService.getSelectOptions(),
      presentaciones: this.presentacionService.getSelectOptions()
    }).subscribe({
      next: (resp) => {
        // console.log(resp.unidades['data']);
        this.unidades = resp.unidades.data;
        this.presentaciones = resp.presentaciones.data;
      },
      error: (err) => {
        SwalHelper.showError("error al cargar datos iniciales.");
        console.error(err);
      }
    })
  }

  editar(): void{
    this.title = false;
    this.productoForm.patchValue(this.productoService.item);
  }
  save(): void{
    // validando formulario
    if(this.productoForm.invalid){
      this.FormErrorHelper.touchAll(this.productoForm);
      return;
    }
    let producto: Producto = this.productoForm.value;
    // si el formulario es valido
    const request = this.title
      ? this.productoService.create(producto)
      : this.productoService.update(producto);
    request.subscribe({
      next: (resp) => {
        let productoResp: Producto = resp;
        this.resetAll();
        SwalHelper.showSuccess(this.productoService.message);
        this.updateTable.emit(productoResp);
      },
      error: (err) =>{
        if(err.status === 422){
          this.FormErrorHelper.setServerErrors(
            this.productoForm,
            err.error.errors
          )
        }
      },
    })
  }
  onCloseModal(): void{
    this.resetAll();
  }
  resetAll(): void{
    this.productoForm.reset();
    this.title = true;
    this.stateModalChange.emit(!this.stateModal);
  }
}
