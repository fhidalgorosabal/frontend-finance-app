import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingManagementComponent } from './setting-management/setting-management.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingManagementComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,    
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class SettingModule { }
