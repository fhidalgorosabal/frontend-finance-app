import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ILabel } from '../../interfaces/label.interface';
import { ReceiptForm } from './receipt.form';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormComponent implements OnInit, OnDestroy {

  @Input() optionsConcept: ILabel[] = []

  @Input() optionsCurrency: ILabel[] = []

  @Input() receiptForm: ReceiptForm;

  @Output() formState = new EventEmitter<ReceiptForm>();

  destroy$ = new Subject<void>();

  constructor() {
    this.receiptForm = new ReceiptForm();
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
