import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ILabel } from 'src/app/shared/interfaces/label.interface';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';
import { ACTION_TYPE } from 'src/app/shared/enums/receipt.enum';

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

  filter: boolean = false;

  columnData: ILabel[] = [
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

  showDetails(action: number) {
    const actionObject: any = {
      1: ACTION_TYPE.CREATE,
      2: ACTION_TYPE.EDIT,
      3: ACTION_TYPE.DETAIL
    };
    this.details.emit(actionObject[action] || ACTION_TYPE.DETAIL);
  }

  showFilter() {
    this.filter = !this.filter;
  }

}
