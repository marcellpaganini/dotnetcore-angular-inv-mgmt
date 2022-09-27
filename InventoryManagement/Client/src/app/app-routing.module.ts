import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierEditComponent } from './suppliers/supplier-edit.component';
import { LoginComponent } from './auth/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductEditComponent },
  { path: 'product', component: ProductEditComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'supplier/:id', component: SupplierEditComponent },
  { path: 'supplier', component: SupplierEditComponent },
  { path: 'login', component: LoginComponent } 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
