import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { Observable } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root',
})

export class SupplierService extends BaseService<Supplier> {
  constructor(http: HttpClient) {
    super(http);
  }

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null): Observable<ApiResult<Supplier>> {
    var url = this.getUrl("api/Suppliers");
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterColumn && filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    return this.http.get<ApiResult<Supplier>>(url, { params });
  }

  get(id: string): Observable<Supplier> {
    var url = this.getUrl("api/Suppliers/" + id);
    return this.http.get<Supplier>(url);
  }

  put(item: Supplier): Observable<Supplier> {
    var url = this.getUrl("api/Suppliers/" + item.supplierId);
    return this.http.put<Supplier>(url, item);
  }

  post(item: Supplier): Observable<Supplier> {
    var url = this.getUrl("api/Suppliers");
    return this.http.post<Supplier>(url, item);
  }

  delete(id: string): Observable<Supplier> {
    var url = this.getUrl("api/Suppliers/" + id);
    return this.http.delete<Supplier>(url);
  }
}
