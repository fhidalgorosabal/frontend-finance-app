import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountFormComponent } from './account-form/account-form.component';


@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailsComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    TableModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
