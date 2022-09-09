import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from './product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'status']
  public products!: Product[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(environment.baseUrl + 'api/Products')
      .subscribe(result => {
        this.products = result;
      }, error => console.error(error));
  }
}
