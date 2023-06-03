import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConceptListComponent } from './concept-list/concept-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConceptListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptRoutingModule { }
