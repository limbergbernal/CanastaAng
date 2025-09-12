import { Observable } from "rxjs";

export interface GridBaseService<T>{
  getAll(): Observable<T[]>;
  create(item: T): Observable<T>;
  update(item: T): Observable<T>;
  delete(id: number): Observable<boolean>;
}
