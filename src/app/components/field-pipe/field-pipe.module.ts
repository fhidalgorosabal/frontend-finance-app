import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldPipeComponent } from './field-pipe.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FieldPipeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FieldPipeComponent
  ]
})
export class FieldPipeModule { }
