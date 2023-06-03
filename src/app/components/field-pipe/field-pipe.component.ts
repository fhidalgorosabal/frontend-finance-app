import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-field-pipe',
  templateUrl: './field-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldPipeComponent {

  @Input() value: any;
   
  @Input() type? = '';

}
