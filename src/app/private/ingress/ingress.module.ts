import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngressRoutingModule } from './ingress-routing.module';
import { ReceiptFormModelModule } from 'src/app/components/receipt-form/receipt-form.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { IngressListComponent } from './ingress-list/ingress-list.component';
import { IngressDetailsComponent } from './ingress-details/ingress-details.component';
import { TableModule } from 'src/app/components/table/table.module';



@NgModule({
  declarations: [
    IngressListComponent,
    IngressDetailsComponent,
  ],
  imports: [
    CommonModule,
    IngressRoutingModule,
    ReceiptFormModelModule,
    TableModule,
    SharedModule
  ],
  exports: [
    IngressListComponent,
    IngressDetailsComponent,
  ]
})
export class IngressModule { }
