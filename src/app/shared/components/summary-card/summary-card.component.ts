import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCardComponent {
  
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '';
  @Input() color: string = '';

}
