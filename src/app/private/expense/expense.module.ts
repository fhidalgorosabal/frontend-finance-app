import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './expense-list/expense-list.component';


@NgModule({
  declarations: [
    ExpenseListComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule
  ],
  exports: [
    ExpenseListComponent
  ]
})
export class ExpenseModule { }
