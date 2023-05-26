import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

import { ReceiptFormModelComponent } from './receipt-form.component';



@NgModule({
  declarations: [
    ReceiptFormModelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  exports: [
    ReceiptFormModelComponent
  ]
})
export class ReceiptFormModelModule { }
