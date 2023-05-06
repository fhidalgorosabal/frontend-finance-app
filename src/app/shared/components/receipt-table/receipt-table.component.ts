import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Label } from 'src/app/shared/interfaces/label.interface';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptTableComponent implements OnInit {

  @Input() title: string = '';

  @Input() receipts: IReceiptData[] = [];

  @Output() details = new EventEmitter<string>();

  @Output() filter = new EventEmitter<void>();

  columnData: Label[] = [
    { label: 'Fecha', value: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe', value: 'amount'}
  ]

  first = 0;

  rows = 10;

  constructor() { }

  ngOnInit(): void {
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.receipts ? this.first === (this.receipts.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.receipts ? this.first === 0 : true;
  }

  showDetails(event: string) {
    this.details.emit(event);
  }

  showFilter() {
    this.filter.emit();
  }

}
