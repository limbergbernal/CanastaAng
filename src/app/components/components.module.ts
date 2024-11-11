import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStructureComponent } from './modal-structure/modal-structure.component';



@NgModule({
  declarations: [
    ModalStructureComponent
  ],
  exports:[
    ModalStructureComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
