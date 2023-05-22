import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, Subject, combineLatest, of } from 'rxjs';
import { takeUntil, catchError, delay, map } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { ReceiptForm } from 'src/app/shared/components/receipt-form/receipt.form';
import { ILabel } from 'src/app/shared/interfaces/label.interface';

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
    return of([
      { label: 'Concepto 1', value: '1' },
      { label: 'Concepto 2', value: '2' },
      { label: 'Concepto 3', value: '3' },
    ]).pipe(
      delay(1000),
    );
  }

  getCurrencies() { //TODO: Consumir datos de la API
    return of([
      { label: 'USD', value: '1' },
      { label: 'MLC', value: '2' },
      { label: 'CUP', value: '3' },
    ]).pipe(
      delay(2000),
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
    console.log(this.expenseForm.value);
    this.displayDetails = false;
    this.cancelDetails.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
