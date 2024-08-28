import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  @Input() progreso = 80;

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {
    if(this.progreso > 100){
      this.progreso =100;
    }
    if(this.progreso < 0){
      this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
  }
  guardar(){
    localStorage.setItem('marca','marcador');
  }
}
