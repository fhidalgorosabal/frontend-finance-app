import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Utils } from 'src/app/shared/utils/utils';
import { IReceiptResponse } from 'src/app/interfaces/receipt.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  title: string = 'Gastos';

  expenses$ = new Observable<IReceiptResponse[]>();

  columnData: ILabel[] = [
    { label: 'Fecha', value: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe Real', value: 'actual_amount', type: 'currency'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private receiptService: ReceiptService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.expensesList();
  }

  expensesList(): void {
    this.expenses$ = this.receiptService.receiptsList( RECEIPT_TYPE.EXPENSE )
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay comprobantes de gasto para mostrar',
            life: 5000
          });  
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
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

  confirmDelete(id: number) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar este comprobante de gasto?',
        accept: () => {
          this.deleteExpense(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteExpense(id: number) {
    this.receiptService.deleteReceipt(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Gasto eliminado!', res));
        this.expensesList();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }
}
