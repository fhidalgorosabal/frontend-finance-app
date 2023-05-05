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
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


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
    PanelModule,
    TooltipModule,
    TableModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,

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
    PanelModule,
    TooltipModule,
    TableModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
  ]
})
export class PrimeNgModule { }
