import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from './../../environments/environment';
import { Supplier } from './supplier';
import { BaseFormComponent } from '../base-form.component';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent extends BaseFormComponent implements OnInit {
  title?: string;
  supplier?: Supplier;
  id?: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
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
      var url = environment.baseUrl + 'api/Suppliers/' + this.id;
      this.http.get<Supplier>(url).subscribe(result => {
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
        var url = environment.baseUrl + 'api/Suppliers/' + supplier?.supplierId;

        this.http
          .put<Supplier>(url, supplier)
          .subscribe(result => {
            console.log("Supplier " + supplier?.supplierId + " has been updated.");

            this.router.navigate(['/suppliers']);
          }, error => this.handleErrors(error, this.form));
      } else {
        var url = environment.baseUrl + 'api/Suppliers/';
        this.http
          .post<Supplier>(url, supplier)
          .subscribe(result => {
            console.log("Supplier " + result.supplierId + " has been created");
            this.router.navigate(['/suppliers']);
          }, error => this.handleErrors(error, this.form));
      }
    }
  }
}
