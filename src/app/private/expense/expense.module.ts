import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ExpenseListComponent } from './expense-list/expense-list.component';


@NgModule({
  declarations: [
    ExpenseListComponent,
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
