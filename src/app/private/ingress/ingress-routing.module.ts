import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngressListComponent } from './ingress-list/ingress-list.component';

const routes: Routes = [
  {
    path: '',
    component: IngressListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngressRoutingModule { }
