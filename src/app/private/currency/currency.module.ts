import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';


@NgModule({
  declarations: [
    CurrencyListComponent,
    CurrencyDetailsComponent,
    CurrencyFormComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule,
    TableModule,
    ReactiveFormsModule,
  ]
})
export class CurrencyModule { }
