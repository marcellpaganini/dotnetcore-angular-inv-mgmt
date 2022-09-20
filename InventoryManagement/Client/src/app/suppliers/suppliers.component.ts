import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Supplier } from './supplier';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})

export class SuppliersComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'address', 'province', 'phone', 'email', 'kebabMenu']
  public suppliers!: MatTableDataSource<Supplier>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterTextChanged: Subject<string> = new Subject<string>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  id?: string;
  supplier?: Supplier;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(query => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = environment.baseUrl + 'api/Suppliers';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (this.sort)
        ? this.sort.active
        : this.defaultSortColumn)
      .set("sortOrder", (this.sort)
        ? this.sort.direction
        : this.defaultSortOrder);

    if (this.filterQuery) {
      params = params
        .set("filterColumn", this.defaultFilterColumn)
        .set("filterQuery", this.filterQuery);
    }

    this.http.get<any>(url, { params })
      .subscribe(result => {
        console.log(result);
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.suppliers = new MatTableDataSource<Supplier>(result.data);
      }, error => console.error(error));
  }

  onDelete(id: string) {
    this.supplier = this.suppliers.data.find(s => s.supplierId === id);

    if (id) {
      var url = environment.baseUrl + 'api/Suppliers/' + id;
      if (confirm("Are you sure?") == true) {
        this.http
          .delete<Supplier>(url)
          .subscribe(result => {
            console.log("Supplier " + id + " has been deleted");
          }, error => console.error(error));
        this.loadData();
      }
    }
  }
}
