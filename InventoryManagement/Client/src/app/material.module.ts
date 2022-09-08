import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
