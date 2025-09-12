import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  static setServerErrors(form: FormGroup, errors: {[key: string]: string[]}){
    if(!errors) return;
    Object.keys(errors).forEach(field =>{
      if(form.controls[field]){
        form.controls[field].setErrors({ serverError: errors[field][0]})
      }
    });
    form.setErrors({ server: true})
  }
  // metodo para obtener el primer mensaje de error de un campo
  static getError(control: AbstractControl | null): string | null{
    if(!control || !control.errors || !control.touched){
      return null;
    }

    const errors = control.errors;
    if(errors['required']) return 'Este campo es obligatorio';
    if(errors['email']) return 'El correo electronico no es válido';
    if(errors['minlength']) return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
    if(errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
    if(errors['pattern']) return 'El formato no es válido';
    if(errors['customError']) return errors['customError'];
    if(errors['serverError']) return errors['serverError'];

    return 'Campo inválido';
  }

  // Metodo para todos los errores de un FormGroup
  static getFormErrors(form: FormGroup): { [key: string]: string}{
    const messages: { [key: string]: string} = {};
    Object.keys(form.controls).forEach( (key) =>{
      const control = form.get(key);
      const error = this.getError(control);
      if(error){
        messages[key] = error;
      }
    });
    return messages;
  }
  static touchAll(form: FormGroup): void{
    Object.keys(form.controls).forEach( controlName => {
      form.get(controlName)?.markAsTouched();
    })
  }
}
