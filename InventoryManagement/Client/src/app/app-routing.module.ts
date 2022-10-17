import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierEditComponent } from './suppliers/supplier-edit.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'supplier/:id', component: SupplierEditComponent, canActivate: [AuthGuard] },
  { path: 'supplier', component: SupplierEditComponent, canActivate: [AuthGuard] },
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
