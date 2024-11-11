import { resolve } from "path";
import Swal from "sweetalert2";

export class SwalHelper{

    static showSuccess(titulo: string, mensaje: string = ""){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster`
        },
        timer: 1500,
      });
    }
    static showError(titulo: string = "Error", mensaje: string = "ocurrio un error."){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        timer: 1500,
      })
    }
    static toastError(mensaje:string){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: mensaje
      });
    }
    static showDialog = async (): Promise<boolean>=>{
      return new Promise<boolean>((resolve) => {
        Swal.fire({
          title: "Seguro?",
          text: "Deseas eliminar este registro!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
          confirmButtonText: "Eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          }
        });
      })
    }
}
