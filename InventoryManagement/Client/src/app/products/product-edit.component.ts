import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from './product';
import { Supplier } from './../suppliers/supplier';
import { BaseFormComponent } from './../base-form.component';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends BaseFormComponent implements OnInit {
  title?: string;
  product?: Product;
  id?: string;
  suppliers?: Supplier[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private productService: ProductService) {
    super();
  }

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
      this.productService.get(this.id).subscribe(result => {
        this.product = result;
        this.title = "Edit - " + this.product.name

        this.form.patchValue(this.product);

      }, error => console.error(error));
    } else {
      this.title = "Create a new product";
    }
  }

  loadSuppliers() {
    this.productService.getSuppliers(
      0,
      9999,
      "name",
      "asc",
      null,
      null,).subscribe(result => {
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
        this.productService
          .put(product)
          .subscribe(result => {
            this._snackBar.open("Product " + product?.name + " has been updated.", "Dismiss");
            this.router.navigate(['/products']);
          }, error => this.handleErrors(error));
      } else {
        this.productService
          .post(product)
          .subscribe(result => {
            this._snackBar.open("Product " + result.name + " has been created", "Dismiss");
            this.router.navigate(['/products']);
          }, error => this.handleErrors(error));
      }
    }
  }
}
