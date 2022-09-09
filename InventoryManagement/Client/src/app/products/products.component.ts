import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from './product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'price', 'status', 'quantity'];
  public products!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(environment.baseUrl + 'api/Products')
      .subscribe(result => {
        this.products = new MatTableDataSource<Product>(result);
        this.products.paginator = this.paginator;
      }, error => console.error(error));
  }
}
