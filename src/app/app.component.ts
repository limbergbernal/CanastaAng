import { UsuarioService } from './services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Canasta';
  // isLoading = true;
  // constructor(private usuarioService: UsuarioService ){
  //   this.usuarioService.validarToken().subscribe({
  //     next: () => {
  //       this.isLoading = false;
  //     }
  //   })
  // }
}
