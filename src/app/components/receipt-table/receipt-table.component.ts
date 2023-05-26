import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ILabel } from 'src/app/interfaces/label.interface';
import { IReceiptData } from 'src/app/interfaces/receipt.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptTableComponent {

  @Input() title: string = '';

  @Input() receipts: IReceiptData[] = [];

  @Output() details = new EventEmitter<ACTION_TYPE>();

  filter = false;

  filterFields = ['date','concept','amount'];

  columnData: ILabel[] = [
    { label: 'Fecha', value: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe', value: 'amount'}
  ];

  first = 0;

  arrayRows = [5,10,25,100];

  rows = 5;

  pageReport = 'Mostrando {first} a {last} de {totalRecords} comprobantes';

  constructor() { }

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

  trackBy(index: number, col: any): number {
    return col.id;
  }

}
