import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ILabel } from 'src/app/interfaces/label.interface';
import { IReceiptResponse } from 'src/app/interfaces/receipt.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptTableComponent {

  @Input() title: string = '';

  @Input() receipts: IReceiptResponse[] = [];

  @Output() details = new EventEmitter<ACTION_TYPE>();

  @Output() delete = new EventEmitter<number>();

  filter = false;

  filterFields = ['date','concept','actual_amount'];

  columnData: ILabel[] = [
    { label: 'Fecha', value: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe Real', value: 'actual_amount'}
  ];

  first = 0;

  arrayRows = [5,10,25,100];

  rows = 5;

  pageReport = 'Mostrando {first} a {last} de {totalRecords} comprobantes';

  constructor( private receiptService: ReceiptService) { }

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

  showDetails(id?: number) {
    let action : ACTION_TYPE;
    if (id) {
      action = ACTION_TYPE.DETAIL;
      this.receiptService.setDetailId(id);
    } else {
      action = ACTION_TYPE.CREATE;
    }
    this.details.emit(action);
  }

  confirmDelete(id?: number) {
    this.delete.emit(id);
  }

  showFilter() {
    this.filter = !this.filter;
  }

  trackBy(index: number, col: any): number {
    return col.id;
  }

}
