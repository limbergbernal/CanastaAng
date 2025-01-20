import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private  linkTheme = document.querySelector("#theme");

  constructor() {
    if(this.isLocalStorageDisponible()){
      const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
      this.linkTheme?.setAttribute('href', url);
    }
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href',url);
    if(this.isLocalStorageDisponible()){
      localStorage.setItem('theme', url);
      this.changeCurrentTheme();
    }
  }

  changeCurrentTheme(){
    if(typeof document !== 'undefined'){
      const links = document.querySelectorAll('.selector');
      links.forEach( elem => {
        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const bntThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme.getAttribute('href');
        if(bntThemeUrl === currentTheme){
          elem.classList.add('working');
        }
      });
    }
  }
  isLocalStorageDisponible(): boolean{
    try{
      return typeof window !== 'undefined' && !!window.localStorage;
    }catch(e){
      return false;
    }
  }
}
