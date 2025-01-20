import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  setItem(key: string, value: string): void{
    if(this.isBrowser){
      localStorage.setItem(key, value);
    }
  }
  getItem(key: string): string | null{
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
  removeItem(key: string): void{
    if(this.isBrowser){
      localStorage.removeItem(key);
    }
  }
}
