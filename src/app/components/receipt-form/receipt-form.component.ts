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

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceiptFormModelComponent implements OnInit, OnDestroy {

  @Input() optionsConcept: ILabel[] = []

  @Input() optionsCurrency: ILabel[] = []

  @Input() receiptForm = new ReceiptFormModel();

  @Output() formState = new EventEmitter<ReceiptFormModel>();

  destroy$ = new Subject<void>();

  constructor() { }

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
