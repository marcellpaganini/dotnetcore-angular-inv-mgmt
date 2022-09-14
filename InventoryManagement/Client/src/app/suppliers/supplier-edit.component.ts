import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { environment } from './../../environments/environment';
import { Supplier } from './supplier';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  title?: string;
  form!: FormGroup;
  supplier?: Supplier;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

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
    var id = idParam ? idParam : '';

    var url = environment.baseUrl + 'api/Suppliers/' + id;
    this.http.get<Supplier>(url).subscribe(result => {
      this.supplier = result;
      this.title = "Edit - " + this.supplier.name

      this.form.patchValue(this.supplier);

    }, error => console.error(error));
  }

  onSubmit() {
    var supplier = this.supplier;

    if (supplier) {
      supplier.name = this.form.controls['name'].value;
      supplier.address = this.form.controls['address'].value;
      supplier.province = this.form.controls['province'].value;
      supplier.phone = this.form.controls['phone'].value;
      supplier.email = this.form.controls['email'].value;
    }

    var url = environment.baseUrl + 'api/Suppliers/' + supplier?.supplierId;

    this.http
      .put<Supplier>(url, supplier)
      .subscribe(result => {
        console.log("Supplier " + supplier?.supplierId + " has been updated.");

        this.router.navigate(['/suppliers']);
      }, error => console.error(error));
  }

}
