import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { TableComponent } from './table.component';
import { FieldPipeModule } from '../field-pipe/field-pipe.module';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FieldPipeModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
