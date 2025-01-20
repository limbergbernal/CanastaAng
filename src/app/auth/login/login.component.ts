import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm:FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    remenber:[false]
  });

  constructor(private localStorageService: LocalStorageService ,private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService){

  }
  login(){
    this.usuarioService.login(this.loginForm.value)
        .subscribe({
          next: (resp) => {
            if(this.loginForm.get('remenber').value){
              this.localStorageService.setItem('email', this.loginForm.get('email').value);
            }else{
              this.localStorageService.removeItem('email');
            }
            //NAVEGAR AL DASHBOARD
              this.router.navigateByUrl('/');
          },
          error: (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        });
    // this.router.navigateByUrl('/');
  }
}
