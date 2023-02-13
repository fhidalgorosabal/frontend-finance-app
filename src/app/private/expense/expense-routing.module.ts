import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseListComponent } from './expense-list/expense-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ExpenseListComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
