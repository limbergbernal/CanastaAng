import { Component, Input, input } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-structure',
  templateUrl: './modal-structure.component.html',
  styles: ``
})
export class ModalStructureComponent {
  @Input() title: string = "";
  @Input() ocultarModal: boolean = true;

  constructor(){

  }

  closeModal(){

  }
}
