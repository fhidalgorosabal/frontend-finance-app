import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptRoutingModule } from './concept-routing.module';
import { TableModule } from 'src/app/components/table/table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptListComponent } from './concept-list/concept-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConceptListComponent
  ],
  imports: [
    CommonModule,
    ConceptRoutingModule,
    TableModule,
    SharedModule,
    FormsModule
  ]
})
export class ConceptModule { }
