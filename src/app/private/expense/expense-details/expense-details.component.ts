import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, Subject, combineLatest, of } from 'rxjs';
import { takeUntil, catchError, delay, map } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ReceiptForm } from 'src/app/shared/components/receipt-form/receipt.form';
import { ILabel } from 'src/app/shared/interfaces/label.interface';
import { ACTION_TYPE, RECEIPT_TYPE } from 'src/app/shared/enums/receipt.enum';
import { IReceiptData } from 'src/app/shared/interfaces/receipt.interface';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit, OnDestroy {

  @Input() titleDetails: string = '';

  @Input() displayDetails = false;

  @Output() cancelDetails = new EventEmitter<void>();

  data$ = new Observable<{ concepts: ILabel[]; currencies: ILabel[]; }>();

  expenseForm: ReceiptForm;

  destroy$ = new Subject<void>();

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private messageService: MessageService
  ) {
    this.expenseForm = new ReceiptForm();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data$ = combineLatest([this.getConcepts(), this.getCurrencies()]).pipe(
      takeUntil(this.destroy$),
      map(([concepts, currencies]) => {
        return {
          'concepts': concepts,
          'currencies': currencies
        }
      }),
      catchError((error) => {
        this.messageService.add({severity: 'error', summary: '¡Error!', detail: error.message});
        return EMPTY;
      }),
    );
  }

  getConcepts() { //TODO: Consumir datos de la API
    return this.conceptService.conceptsList( RECEIPT_TYPE.EXPENSE ).pipe(
      map(
        (data) => data.map(data => ({label: data.description, value: data.id }))
      )
    );
  }

  getCurrencies() { //TODO: Consumir datos de la API
    return this.currencyService.currenciesList().pipe(
      map(
        (data) => data.map(data => ({label: data.initials, value: data.id }))
      )
    );
  }

  showDialogDetails(title: string) {
    this.titleDetails = title;
    this.displayDetails = true;
  }

  cancelDialogDetails() {
    this.expenseForm.reset();
    this.displayDetails = false;
    this.cancelDetails.emit();
  }

  setForm(form: ReceiptForm) {
    this.expenseForm = form;
  }

  isInvalidForm() {
    return this.expenseForm.invalid;
  }

  save(){
    (this.titleDetails === ACTION_TYPE.CREATE) ? this.createExpense() : this.editExpense();
    this.displayDetails = false;
    this.cancelDetails.emit();
  }

  createExpense() {
    const dataForm = this.expenseForm.value;

    const expense: IReceiptData = {
      date: Utils.dateFormat(dataForm.date),
      concept_id: dataForm.concept.value,
      type: RECEIPT_TYPE.EXPENSE,
      amount: dataForm.amount,
      currency_id: dataForm.currency.value,
      description: dataForm.description
    }

    this.receiptService.createReceipt(expense)
    .subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (error) => this.messageService.add({severity: 'error', summary: '¡Error!', detail: error.message}),
    });
  }

  editExpense() {
    console.log('Edit', this.expenseForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
