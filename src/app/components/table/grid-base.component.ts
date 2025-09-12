import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { OnInit } from '@angular/core';
import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridOptions,
} from 'ag-grid-community';
import { GridAction } from '../../interfaces/GridAction.interface';
import { ACTIONS_MAP } from '../../helpers/actionButtons.helper';

export abstract class GridBaseComponent<T = any> {
  public columnDefs: ColDef[] = [];
  public rowData: any[] = [];
  public gridOptions: GridOptions = {};
  public defaultColDef: ColDef = {};
  public localText = AG_GRID_LOCALE_ES;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50, 100];

  private actionButtons: GridAction[] = [];

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);

  constructor() {
    this.gridOptions = {
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: this.paginationPageSizeSelector,
      domLayout: 'autoHeight',
      defaultColDef: {
        sortable: true,
        filter: true,
        floatingFilter: true,
        autoHeaderHeight: true,
        resizable: true,
        flex: 1,
      },
      getRowId: params => params.data.id +"",
    };
  }

  abstract initializeGrid(): void;
  abstract getColumnDefinitions(): ColDef[];
  // Métodos basicos que pueden ser sobreescritos por hijos
  abstract onEdit(rowData: any): void ;
  abstract onDelete(rowData: any): void;
  abstract onFilterTextChanged(event: any): void;

  addActionButtons(actions: (string | Partial<GridAction>)[]): void{
    actions.forEach( a => {
      if( typeof a === 'string'){
        const config = ACTIONS_MAP[a];
        if(config){
          this.actionButtons.push({
            name: a,
            icon: config.icon!,
            btnClass: config.btnClass!,
            callback: (row) =>{
              const method = (this as any)[config.defaultCallbackName];
              if(method) method.call(this, row)
            }
          });
        }
      }
      else{
          // custom action definido como JSON
          this.actionButtons.push({
            name: a.name,
            icon: a.icon || 'fa fa-cog',
            btnClass: a.btnClass || 'btn btn-secondary',
            callback: a.callback!
          })
        }
    });
  }

  /**
   * TODO: METODO PARA AÑADIR BOTONES
   */
  enableActionColumn(): void {
    this.columnDefs.push({
      headerName: 'Acciones',
      field: 'actions',
      resizable: false,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        return this.actionButtons.map(btn => `
          <button class="btn btn-sm ${btn.btnClass}" data-action?"${btn.name}">
            <i class="${btn.icon}" data-action="${btn.name}"></i>
          </button>
        `).join('');
      },
    });
  }

  getButtons(): string{
    return `<button class="btn btn-sm btn-warning btn-edit" data-action="edit"><i class="fa fa-pencil text-inverse" data-action="edit"></i></button>
          <button class="btn btn-sm btn-danger btn-delete" data-action="delete"><i class="fa fa-close text-white" data-action="delete"></i></button>
        `;
  }

  onCellClicked(event: any): void{
    const actionType = event.event.target?.getAttribute('data-action');
    const action = this.actionButtons.find(a => a.name === actionType);
    if(action){
      action.callback(event.data);
    }
  }

  setRowData(data: T[]): void {
    this.rowData = [...data];
  }
  addRow(data: T): void {
    this.rowData = [...this.rowData, data];
  }
  deleteRow(data: T): void {
    this.rowData = this.rowData.filter((row) => row !== data);
  }

  updateRow(updateData: T, index: number): void {
    this.rowData[index] = updateData;
    this.rowData = [...this.rowData];
  }


}
