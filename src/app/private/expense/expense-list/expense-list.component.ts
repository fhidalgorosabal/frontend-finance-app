import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';
import { RECEIPT_TYPE } from 'src/app/shared/enums/receipt.enum';
import { Label } from 'src/app/shared/interfaces/label.interface';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  expenses: IReceiptData[] = [];

  columnData: Label[] = [
    { label: 'Fecha', value: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe', value: 'amount'}
  ]

  first = 0;

  rows = 10;

  displayFilter = false;

  displayDetails = false;

  titleDetails: string = '';

  destroy$ = new Subject<void>();

  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.receiptService.receiptsList( RECEIPT_TYPE.EXPENSE )
    .pipe(
      takeUntil(this.destroy$),
      tap((res: IReceiptData[]) => {
        this.expenses = res;
      })
    ).subscribe();
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
      return this.expenses ? this.first === (this.expenses.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.expenses ? this.first === 0 : true;
  }

  showDialogFilter() {
      this.displayFilter = true;
  }

  showDialogDetails(title: string) {
    this.titleDetails = title;
    this.displayDetails = true;
  }

  cancelDialogDetails() {
    this.displayDetails = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
