import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountFormModel } from './account-form.model';
import { IAccount } from 'src/app/interfaces/account.interface';
import { ILabel } from 'src/app/interfaces/label.interface';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AccountFormComponent implements OnInit, OnDestroy {

  @Input() optionsCurrency: ILabel[] = [];

  @Input() optionsBank: ILabel[] = [];

  @Input() accountForm = new AccountFormModel();

  @Input() account?: IAccount;

  @Output() formState = new EventEmitter<AccountFormModel>();

  destroy$ = new Subject<void>();

  ngOnInit(): void {    
    this.accountForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.accountForm)
    );
    this.getDetailData();
  }

  getDetailData(): void {    
    if (this.account) {
      const currency = this.optionsCurrency.find( option => option.value == this.account?.currency_id );
      const bank = this.optionsBank.find( option => option.value == this.account?.bank_id );

      this.accountForm.setValue({
        code: this.account.code,
        description: this.account.description,
        currency: currency,
        bank: bank ? bank : null,
        active: this.account.active
      });
    }
  }

  isValidField(field: string): boolean {
    return this.accountForm.controls[field].touched && this.accountForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
