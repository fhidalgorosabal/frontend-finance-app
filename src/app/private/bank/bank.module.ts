import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankListComponent } from './bank-list/bank-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BankFormComponent } from './bank-form/bank-form.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';


@NgModule({
  declarations: [
    BankListComponent,
    BankDetailsComponent,
    BankFormComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    SharedModule,
    TableModule,
    ReactiveFormsModule
  ]
})
export class BankModule { }
