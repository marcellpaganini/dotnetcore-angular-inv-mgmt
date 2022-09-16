import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from './../../environments/environment';
import { Product } from './product';
import { Supplier } from './../suppliers/supplier';
import { handleErrors } from '../shared/errorHandling';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  title?: string;
  form!: FormGroup;
  product?: Product;
  id?: string;
  suppliers?: Supplier[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required)
    });

    this.loadData();
  }

  loadData() {
    this.loadSuppliers();

    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? idParam : undefined;

    if (this.id) {
      var url = environment.baseUrl + 'api/Products/' + this.id;
      this.http.get<Product>(url).subscribe(result => {
        this.product = result;
        this.title = "Edit - " + this.product.name

        this.form.patchValue(this.product);

      }, error => console.error(error));
    } else {
      this.title = "Create a new product";
    }
  }

  loadSuppliers() {
    var url = environment.baseUrl + 'api/Suppliers';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");
    this.http.get<any>(url, { params }).subscribe(result => {
      this.suppliers = result.data;
    }, error => console.error(error));
  }

  onSubmit() {
    var product = this.id ? this.product : <Product>{};

    if (product) {
      product.name = this.form.controls['name'].value;
      product.description = this.form.controls['description'].value;
      product.price = this.form.controls['price'].value;
      product.quantity = this.form.controls['quantity'].value;
      product.status = this.form.controls['status'].value;
      product.supplierId = this.form.controls['supplierId'].value;

      if (this.id) {
        var url = environment.baseUrl + 'api/Products/' + product?.productId;

        this.http
          .put<Product>(url, product)
          .subscribe(result => {
            console.log("Product " + product?.productId + " has been updated.");

            this.router.navigate(['/products']);
          }, error => handleErrors(error, this.form));
      } else {
        var url = environment.baseUrl + 'api/Products/';
        this.http
          .post<Product>(url, product)
          .subscribe(result => {
            console.log("Product " + result.productId + " has been created");
            this.router.navigate(['/products']);
          }, error => handleErrors(error, this.form));
      }
    }
  }
}
