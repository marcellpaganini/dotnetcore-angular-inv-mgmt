import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Supplier } from './supplier';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'address', 'province', 'phone', 'email']
  public suppliers!: Supplier[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Supplier[]>(environment.baseUrl + 'api/Suppliers')
      .subscribe(result => {
        this.suppliers = result;
      }, error => console.error(error));
  }
}
