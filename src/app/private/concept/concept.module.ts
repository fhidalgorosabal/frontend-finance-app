import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptRoutingModule } from './concept-routing.module';
import { TableModule } from 'src/app/components/table/table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptListComponent } from './concept-list/concept-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConceptDetailsComponent } from './concept-details/concept-details.component';
import { ConceptFormComponent } from './concept-form/concept-form.component';


@NgModule({
  declarations: [
    ConceptListComponent,
    ConceptDetailsComponent,
    ConceptFormComponent
  ],
  imports: [
    CommonModule,
    ConceptRoutingModule,
    TableModule,
    SharedModule,
    FormsModule,    
    ReactiveFormsModule,
  ]
})
export class ConceptModule { }
