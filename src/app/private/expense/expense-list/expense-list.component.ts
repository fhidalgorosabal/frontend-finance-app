import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';
import { RECEIPT_TYPE } from 'src/app/shared/enums/receipt.enum';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  title: string = 'Comprobantes de gasto';

  expenses$ = new Observable<IReceiptData[] | undefined>();

  displayFilter = false;

  displayDetails = false;

  titleDetails: string = '';

  destroy$ = new Subject<void>();

  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.expenses$ = this.receiptService.receiptsList( RECEIPT_TYPE.EXPENSE )
    .pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error(error);
        return of(undefined);
      }),
      );
  }

  showDialogDetails(title: string) {
    this.titleDetails = title;
    this.displayDetails = true;
  }

  cancelDialogDetails() {
    this.displayDetails = false;
  }

  showDialogFilter() {
    this.displayFilter = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
