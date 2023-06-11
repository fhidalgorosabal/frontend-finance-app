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
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputMaskModule} from 'primeng/inputmask';


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
    CalendarModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    InputMaskModule,
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
    CalendarModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    InputMaskModule,
  ]
})
export class PrimeNgModule { }
