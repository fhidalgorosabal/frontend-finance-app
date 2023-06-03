import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';


@NgModule({
  declarations: [
    CurrencyListComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule,
    TableModule
  ]
})
export class CurrencyModule { }
