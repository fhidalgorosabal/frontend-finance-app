import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpenseDetailsComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SharedModule
  ],
  exports: [
    ExpenseListComponent
  ]
})
export class ExpenseModule { }
