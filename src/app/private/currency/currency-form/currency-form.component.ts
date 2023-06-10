import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyFormModel } from './currency-form.model';
import { ICurrency } from 'src/app/interfaces/currency.interface';
import { ILabel } from 'src/app/interfaces/label.interface';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyFormComponent implements OnInit, OnDestroy {

  @Input() currencyForm = new CurrencyFormModel();

  @Input() currency?: ICurrency;

  @Output() formState = new EventEmitter<CurrencyFormModel>();

  destroy$ = new Subject<void>();

  ngOnInit(): void {    
    this.currencyForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.currencyForm)
    );
    this.getDetailData();
  }

  getDetailData(): void {
    if (this.currency) {
      this.currencyForm.setValue({
        initials: this.currency.initials,
        description: this.currency.description,
        exchange_rate: this.currency.exchange_rate,
        is_default: this.currency.is_default,
        active: this.currency.active
      });
    }
  }

  isValidField(field: string): boolean {
    return this.currencyForm.controls[field].touched && this.currencyForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
