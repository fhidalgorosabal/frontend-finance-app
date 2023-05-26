import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { MessageService } from 'primeng/api';
import { IReceiptResponse } from 'src/app/interfaces/receipt.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  title: string = 'Comprobantes de gasto';

  expenses$ = new Observable<IReceiptResponse[]>();

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

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
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: '¡Error!', detail: error.message});
        return EMPTY;
      }),
    );
  }

  showDialogDetails(action: ACTION_TYPE) {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(event: boolean) {
    if (event) {
      this.expensesList();
    }
    this.displayDetails = false;
  }
}
