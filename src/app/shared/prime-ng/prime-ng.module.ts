import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StyleClassModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    BadgeModule,
    ToastModule,
    MenuModule,
    PanelModule
  ],
  exports: [
    CommonModule,
    StyleClassModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    BadgeModule,
    ToastModule,
    MenuModule,
    PanelModule
  ]
})
export class PrimeNgModule { }
