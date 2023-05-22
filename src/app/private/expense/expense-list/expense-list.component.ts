import { Component, OnInit, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { MessageService } from 'primeng/api';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';
import { RECEIPT_TYPE } from 'src/app/shared/enums/receipt.enum';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  title: string = 'Comprobantes de gasto';

  expenses$ = new Observable<IReceiptData[]>();

  titleDetails: string = '';

  displayDetails = false;

  destroy$ = new Subject<void>();

  constructor(
    private receiptService: ReceiptService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.expensesList();
  }

  expensesList(): void {
    this.expenses$ = this.receiptService.receiptsList( RECEIPT_TYPE.EXPENSE )
    .pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: '¡Error!', detail: error.message});
        return EMPTY;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
