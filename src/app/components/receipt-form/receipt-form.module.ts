import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ConfirmationService } from 'primeng/api';
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
  ],
  providers: [
    ConfirmationService
  ]
})
export class ReceiptFormModelModule { }
