import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from './../../environments/environment';
import { Product } from './product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  title?: string;
  form!: FormGroup;
  product?: Product;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      quantity: new FormControl(0),
      status: new FormControl('')
    });

    this.loadData();
  }

  loadData() {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    var id = idParam ? idParam : '';

    var url = environment.baseUrl + 'api/Products/' + id;
    this.http.get<Product>(url).subscribe(result => {
      this.product = result;
      this.title = "Edit - " + this.product.name

      this.form.patchValue(this.product);

    }, error => console.error(error));
  }

  onSubmit() {
    var product = this.product;

    if (product) {
      product.name = this.form.controls['name'].value;
      product.description = this.form.controls['description'].value;
      product.price = this.form.controls['price'].value;
      product.quantity = this.form.controls['quantity'].value;
      product.status = this.form.controls['status'].value;
    }

    var url = environment.baseUrl + 'api/Products/' + product?.productId;

    this.http
      .put<Product>(url, product)
      .subscribe(result => {
        console.log("Product " + product?.productId + " has been updated.");

        this.router.navigate(['/products']);
      }, error => console.error(error));
  }

}
