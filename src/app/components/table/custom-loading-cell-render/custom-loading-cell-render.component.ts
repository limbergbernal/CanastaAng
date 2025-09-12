import { Component, signal } from '@angular/core';
import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { ILoadingCellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-loading-cell-render',
  templateUrl: './custom-loading-cell-render.component.html',
  styles: ``
})
export class CustomLoadingCellRenderComponent implements ILoadingCellRendererAngularComp{
  public loadingMessage = signal('');
  agInit(params: ILoadingCellRendererParams<any, any> & { loadingMessage: string}): void {
      this.loadingMessage.set(params.loadingMessage);
  }
}
