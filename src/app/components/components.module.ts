import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStructureComponent } from './modal-structure/modal-structure.component';
import { CustomLoadingCellRenderComponent } from './table/custom-loading-cell-render/custom-loading-cell-render.component';
import { CustomLoadingOverlayComponent } from './table/custom-loading-overlay/custom-loading-overlay.component';
import { GridBaseComponent } from './table/grid-base.component';



@NgModule({
  declarations: [
    ModalStructureComponent,
    CustomLoadingCellRenderComponent,
    CustomLoadingOverlayComponent,
  ],
  exports:[
    ModalStructureComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
