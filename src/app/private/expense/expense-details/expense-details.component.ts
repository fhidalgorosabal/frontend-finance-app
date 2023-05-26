import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, first, switchMap } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ReceiptFormModel } from 'src/app/components/receipt-form/receipt-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { IReceiptData, IReceipt } from 'src/app/interfaces/receipt.interface';
import { Utils } from 'src/app/shared/utils/utils';

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

  expenseForm: ReceiptFormModel;

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private messageService: MessageService
  ) {
    this.expenseForm = new ReceiptFormModel();
    if (this.actionDetails === ACTION_TYPE.DETAIL) {
      this.getDetailReceipt();
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const concepts$ = this.getConcepts();
    const currencies$ = this.getCurrencies();
    const receipt$ = this.getDetailReceipt();

    this.data$ = combineLatest([
      concepts$,
      currencies$,
      ...(this.actionDetails === ACTION_TYPE.DETAIL ? [receipt$] : [])
    ]).pipe(
      first(),
      map(([concepts, currencies, receipt]) => {
        return {
          'concepts': concepts,
          'currencies': currencies,
          'receipt': receipt
        }
      }),
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: '¡Error!', detail: error.message});
        return EMPTY;
      }),
    );
  }

  getConcepts(): Observable<ILabel[]> {
    return this.conceptService.conceptsList( RECEIPT_TYPE.EXPENSE ).pipe(
      map(
        (data) => data.map(data => ({label: data.description, value: data.id }))
      )
    );
  }

  getCurrencies(): Observable<ILabel[]> {
    return this.currencyService.currenciesList().pipe(
      map(
        (data) => data.map(data => ({label: data.initials, value: data.id }))
      )
    );
  }

  getDetailReceipt(): Observable<IReceipt> {
    return this.receiptService.detailId.asObservable().pipe(
      first(),
      switchMap(id => this.receiptService.getReceipt(id))
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del comprobante' : 'Crear Comprobante';
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
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createExpense() : this.editExpense();
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }

  createExpense(): void {
    const dataForm = this.expenseForm.value;

    const expense: IReceipt = {
      date: Utils.dateFormat(dataForm.date),
      concept_id: dataForm.concept.value,
      type: RECEIPT_TYPE.EXPENSE,
      amount: dataForm.amount,
      currency_id: dataForm.currency.value,
      description: dataForm.description
    }

    this.receiptService.createReceipt(expense)
    .pipe(first())
    .subscribe({
      next: (res) => this.messageService.add({ severity: res?.status, summary:'¡Nuevo comprobante!', detail: res?.message }),
      error: (error) => this.messageService.add({ severity: 'error', summary: '¡Error!', detail: error.message }),
    });
  }

  editExpense(): void {
    console.log('Edit', this.expenseForm.value);
  }

}
