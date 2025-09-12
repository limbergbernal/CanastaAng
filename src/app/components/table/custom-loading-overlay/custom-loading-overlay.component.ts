import { Component, signal } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { ILoadingOverlayParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-loading-overlay',
  templateUrl: './custom-loading-overlay.component.html',
  styles: ``
})
export class CustomLoadingOverlayComponent implements ILoadingOverlayAngularComp{
  loadingMessage = signal('');
  agInit(params: ILoadingOverlayParams<any, any> & {loadingMessage : string}): void {
    this.refresh(params);
  }
  refresh?(params: ILoadingOverlayParams<any, any> & {loadingMessage : string}): void {
    this.loadingMessage.set(params.loadingMessage);
  }

}
