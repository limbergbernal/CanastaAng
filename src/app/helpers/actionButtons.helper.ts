
interface GridActionConfig{
  icon: string;
  btnClass: string;
  defaultCallbackName: string;
}
export const ACTIONS_MAP: Record<string, Partial<GridActionConfig>> = {
  edit: {
    icon: 'fa fa-pencil text-inverse',
    btnClass: 'btn-warning',
    defaultCallbackName: 'onEdit'
  },
  delete:{

    icon: 'fa fa-close text-white',
    btnClass: 'btn btn-sm btn-danger btn-delete',
    defaultCallbackName: 'onDelete',
  },
  addpermisos:{

    icon: 'fa fa-list text-white',
    btnClass: 'btn btn-sm btn-info btn-permissions',
    defaultCallbackName: 'onAddPermisos',
  }
}

