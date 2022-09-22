import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Supplier } from '../suppliers/supplier';

@Injectable({
  providedIn: 'root',
})

export class ProductService extends BaseService<Product> {
  constructor(http: HttpClient) {
    super(http);
  }

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null): Observable<ApiResult<Product>> {
    var url = this.getUrl("api/Products");
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
    return this.http.get<ApiResult<Product>>(url, { params });
  }

  get(id: string): Observable<Product> {
    var url = this.getUrl("api/Products/" + id);
    return this.http.get<Product>(url);
  }

  put(item: Product): Observable<Product> {
    var url = this.getUrl("api/Products/" + item.productId);
    return this.http.put<Product>(url, item);
  }

  post(item: Product): Observable<Product> {
    var url = this.getUrl("api/Products");
    return this.http.post<Product>(url, item);
  }

  delete(id: string): Observable<Product> {
    var url = this.getUrl("api/Products/" + id);
    return this.http.delete<Product>(url);
  }

  getSuppliers(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null): Observable<ApiResult<Supplier>> {
    var url = this.getUrl('api/Suppliers');
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
}
