import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ReceiptFormModelModule } from 'src/app/components/receipt-form/receipt-form.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { TableModule } from 'src/app/components/table/table.module';



@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpenseDetailsComponent,
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    ReceiptFormModelModule,
    TableModule,
    SharedModule
  ],
  exports: [
    ExpenseListComponent,
    ExpenseDetailsComponent,
  ]
})
export class ExpenseModule { }
