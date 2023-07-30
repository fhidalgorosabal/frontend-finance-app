import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  DoCheck
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ILabel } from '../../interfaces/label.interface';
import { ReceiptFormModel } from './receipt-form.model';
import { IReceipt } from 'src/app/interfaces/receipt.interface';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormModelComponent implements OnInit, DoCheck, OnDestroy {

  @Input() optionsConcept: ILabel[] = []

  @Input() optionsCurrency: ILabel[] = []

  @Input() optionsAccount: ILabel[] = []

  tempAccounts: ILabel[] = []

  @Input() receiptForm = new ReceiptFormModel();

  @Input() receipt?: IReceipt;

  @Output() formState = new EventEmitter<ReceiptFormModel>();

  destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.receiptForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.receiptForm)
    );
    this.getDetailData();  
    this.tempAccounts = [...this.optionsAccount];
  }

  ngDoCheck(): void { 
    this.changeCurrencyType();    
  }

  getDetailData(): void {
    if (this.receipt) {
      const date = new Date(Utils.dateType(this.receipt.date));
      const concept = this.optionsConcept.find( option => option.value == this.receipt?.concept_id );
      const currency = this.optionsCurrency.find( option => option.value == this.receipt?.currency_id );
      const account = this.optionsAccount.find( option => option.value == this.receipt?.account_id );

      this.receiptForm.setValue({
        date: date,
        concept: concept,
        amount: this.receipt.amount,
        currency: currency,
        actual_amount: this.receipt.actual_amount,
        account: account,
        description: this.receipt.description
      });
    }
  }

  isValidField(field: string): boolean {
    return this.receiptForm.controls[field].touched && this.receiptForm.controls[field].invalid;
  }

  changeCurrencyType(): void {    
    const currencyField = this.receiptForm.controls['currency'];      
    if (currencyField.valid) {     
      this.receiptForm.controls['account'].enable(); 
      this.optionsAccount = [...this.tempAccounts];
      this.optionsAccount = this.optionsAccount.filter(
        account => account.type === currencyField.value.type
      );          
    } else {
      this.receiptForm.controls['account'].disable(); 
    }    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
