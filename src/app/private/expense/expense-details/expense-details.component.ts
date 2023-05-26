import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, first } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ReceiptFormModel } from 'src/app/components/receipt-form/receipt-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { IReceiptData } from 'src/app/interfaces/receipt.interface';
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

  data$ = new Observable<{ concepts: ILabel[]; currencies: ILabel[]; }>();

  expenseForm: ReceiptFormModel;

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private messageService: MessageService
  ) {
    this.expenseForm = new ReceiptFormModel();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.data$ = combineLatest([this.getConcepts(), this.getCurrencies()]).pipe(
      first(),
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

  getConcepts() {
    return this.conceptService.conceptsList( RECEIPT_TYPE.EXPENSE ).pipe(
      map(
        (data) => data.map(data => ({label: data.description, value: data.id }))
      )
    );
  }

  getCurrencies() {
    return this.currencyService.currenciesList().pipe(
      map(
        (data) => data.map(data => ({label: data.initials, value: data.id }))
      )
    );
  }

  getTitle(actionDetails: ACTION_TYPE) {
    return (actionDetails === ACTION_TYPE.CREATE) ? 'Crear comprobante' : 'Editar Comprobante';
  }

  showDialogDetails(action: ACTION_TYPE) {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails() {
    this.expenseForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: ReceiptFormModel) {
    this.expenseForm = form;
  }

  isInvalidForm() {
    return this.expenseForm.invalid;
  }

  save(){
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createExpense() : this.editExpense();
    this.displayDetails = false;
    this.closeDetails.emit(true);
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
    .pipe(first())
    .subscribe({
      next: (res) => this.messageService.add({ severity: res?.status, summary:'¡Correcto!', detail: res?.message }),
      error: (error) => this.messageService.add({ severity: 'error', summary: '¡Error!', detail: error.message }),
    });
  }

  editExpense() {
    console.log('Edit', this.expenseForm.value);
  }

}
