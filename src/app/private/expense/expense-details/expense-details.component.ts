import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, forkJoin } from 'rxjs';
import { catchError, map, first, switchMap, tap } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { AccountService } from 'src/app/services/account.service';
import { TableService } from 'src/app/services/table.service';
import { SessionService } from 'src/app/services/sesion.service';
import { ReceiptFormModel } from 'src/app/components/receipt-form/receipt-form.model';
import { Utils } from 'src/app/shared/utils/utils';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { IReceiptData, IReceipt } from 'src/app/interfaces/receipt.interface';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Output() closeDetails = new EventEmitter<boolean>();

  data$ = new Observable<IReceiptData>();

  id: number | null = null;

  expenseForm: ReceiptFormModel;

  saving = false;

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private accountService: AccountService,
    private messageService: MessageService,
    private tableService: TableService,
    private sessionService: SessionService
  ) {
    this.expenseForm = new ReceiptFormModel();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const companyId = this.sessionService?.companyId;
    const concepts$ = this.conceptService.conceptsList( companyId, RECEIPT_TYPE.EXPENSE );
    const currencies$ = this.currencyService.currenciesList( companyId );
    const accounts$ = this.accountService.accountsList( companyId );
    const receipt$ = this.getDetailReceipt();

    this.data$ = forkJoin([
      concepts$,
      currencies$,
      accounts$,
      ...(this.actionDetails === ACTION_TYPE.DETAIL ? [receipt$] : [])
    ]).pipe(
      first(),
      map(([concepts, currencies, accounts, receipt]) => {
        return {
          'concepts': concepts,
          'currencies': currencies,
          'accounts': accounts,
          'receipt': receipt
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
    );
  }

  getDetailReceipt(): Observable<IReceipt> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.receiptService.getReceipt(detailId) )
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del comprobante de gasto' : 'Crear comprobante de gasto';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.expenseForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: ReceiptFormModel): void {
    this.expenseForm = form;
  }

  isInvalidForm(): boolean {
    return this.expenseForm.invalid;
  }

  save(): void {
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createExpense() : this.editExpense();
  }

  private createExpense(): void {
    this.receiptService.createReceipt(this.getFormReceipt()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('Nuevo gasto', res));
        this.close();
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  private editExpense(): void {
    if (this.id) {
      this.receiptService.editReceipt(this.getFormReceipt(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('Gasto actualizado', res));
          this.close();
        }),
        catchError((error) => {
          this.messageService.add(Utils.responseError(error));
          this.saving = false;
          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private getFormReceipt(): IReceipt {
    const dataForm = this.expenseForm.value;
    return {
      date: Utils.dateFormatISO8601(dataForm.date),
      concept_id: dataForm.concept.value,
      type: RECEIPT_TYPE.EXPENSE,
      amount: dataForm.amount,
      currency_id: dataForm.currency.value,
      account_id: dataForm.account.value,
      description: dataForm.description,
      company_id: this.sessionService?.companyId
    }
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }
}
