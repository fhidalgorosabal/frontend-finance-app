import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { TableComponent } from './table.component';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
