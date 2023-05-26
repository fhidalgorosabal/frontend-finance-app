import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ILabel } from '../../interfaces/label.interface';
import { ReceiptFormModel } from './receipt-form.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormModelComponent implements OnInit, OnDestroy {

  @Input() optionsConcept: ILabel[] = []

  @Input() optionsCurrency: ILabel[] = []

  @Input() receiptForm: ReceiptFormModel;

  @Output() formState = new EventEmitter<ReceiptFormModel>();

  destroy$ = new Subject<void>();

  constructor() {
    this.receiptForm = new ReceiptFormModel();
   }

  ngOnInit(): void {
    this.receiptForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.receiptForm)
    );
  }

  isValidField(field: string) {
    return this.receiptForm.controls[field].touched && this.receiptForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
