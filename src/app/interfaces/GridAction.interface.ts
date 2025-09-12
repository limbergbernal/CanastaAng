export interface GridAction{
  name: string;
  icon: string;
  btnClass: string;
  callback: (rowData: any) => void;
  isVisible?: (rowData: any) => boolean;
  isDisabled?: (rowData: any) => boolean;
  tooltip?: string;
}
