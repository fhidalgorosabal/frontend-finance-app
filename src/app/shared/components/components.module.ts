import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ReceiptTableComponent } from './receipt-table/receipt-table.component';
import { ReceiptFormComponent } from './receipt-form/receipt-form.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ReceiptTableComponent,
    ReceiptFormComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    ReceiptTableComponent,
    ReceiptFormComponent
  ]
})
export class ComponentsModule { }