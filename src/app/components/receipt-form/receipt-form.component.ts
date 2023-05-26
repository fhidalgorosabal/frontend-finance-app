import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
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
export class ReceiptFormModelComponent implements OnInit, OnDestroy {

  @Input() optionsConcept: ILabel[] = []

  @Input() optionsCurrency: ILabel[] = []

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
  }

  getDetailData(): void {
    if (this.receipt) {
      const date = new Date(Utils.dateType(this.receipt.date));
      const concept = this.optionsConcept.find( option => option.value == this.receipt?.concept_id );
      const currency = this.optionsCurrency.find( option => option.value == this.receipt?.currency_id );

      this.receiptForm.setValue({
        date: date,
        concept: concept,
        amount: this.receipt.amount,
        currency: currency,
        actual_amount: this.receipt.actual_amount,
        description: this.receipt.description
      });
    }
  }

  isValidField(field: string): boolean {
    return this.receiptForm.controls[field].touched && this.receiptForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
