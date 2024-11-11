import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService){

  }
  login(){
    this.usuarioService.login(this.loginForm.value)
        .subscribe({
          next: (resp) => {
            if(this.loginForm.get('remenber').value){
              localStorage.setItem('email', this.loginForm.get('email').value);
            }else{
              localStorage.removeItem('email');
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
