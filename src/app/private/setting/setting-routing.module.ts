import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingManagementComponent } from './setting-management/setting-management.component';

const routes: Routes = [
  {
    path: '',
    component: SettingManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
