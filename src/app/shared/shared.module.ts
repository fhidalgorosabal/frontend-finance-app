import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    SummaryCardComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    PrimeNgModule,
    HeaderComponent,
    LoadingComponent,
    SummaryCardComponent,
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
