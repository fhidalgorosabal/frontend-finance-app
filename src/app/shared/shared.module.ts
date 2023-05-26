import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    PrimeNgModule,
    HeaderComponent,
    LoadingComponent
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
