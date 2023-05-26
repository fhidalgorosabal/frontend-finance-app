import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

import { ReceiptTableComponent } from './receipt-table.component';



@NgModule({
  declarations: [
    ReceiptTableComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    ReceiptTableComponent
  ]
})
export class ReceiptTableModule { }
