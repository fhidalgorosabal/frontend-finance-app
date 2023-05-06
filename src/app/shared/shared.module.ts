import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { ComponentsModule } from './components/components.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';



@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PrimeNgModule
  ],
  exports: [
    ComponentsModule,
    PrimeNgModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
