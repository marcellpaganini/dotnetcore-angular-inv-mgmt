import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Supplier } from './supplier';
import { BaseFormComponent } from './../base-form.component';
import { SupplierService } from './supplier.service';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent extends BaseFormComponent implements OnInit {
  title?: string;
  supplier?: Supplier;
  id?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private supplierService: SupplierService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      province: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });

    this.loadData();
  }

  loadData() {
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? idParam : undefined;

    if (this.id) {
      this.supplierService.get(this.id).subscribe(result => {
        this.supplier = result;
        this.title = "Edit - " + this.supplier.name

        this.form.patchValue(this.supplier);

      }, error => console.error(error));
    } else {
      this.title = "Create a new supplier";
    }
  }

  onSubmit() {
    var supplier = this.id ? this.supplier : <Supplier>{};

    if (supplier) {
      supplier.name = this.form.controls['name'].value;
      supplier.address = this.form.controls['address'].value;
      supplier.province = this.form.controls['province'].value;
      supplier.phone = this.form.controls['phone'].value;
      supplier.email = this.form.controls['email'].value;

      if (this.id) {
        this.supplierService
          .put(supplier)
          .subscribe(result => {
            this._snackBar.open("Supplier " + supplier?.name + " has been updated.", "Dismiss");
            this.router.navigate(['/suppliers']);
          }, error => this.handleErrors(error));
      } else {
        this.supplierService
          .post(supplier)
          .subscribe(result => {
            this._snackBar.open("Supplier " + result.name + " has been created", "Dismiss");
            this.router.navigate(['/suppliers']);
          }, error => this.handleErrors(error));
      }
    }
  }
}
