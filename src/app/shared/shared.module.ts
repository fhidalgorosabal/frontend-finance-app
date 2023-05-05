import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    PrimeNgModule,
    HeaderComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
