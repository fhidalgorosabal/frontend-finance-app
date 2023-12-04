import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BankFormModel } from './bank-form.model';
import { IBank } from 'src/app/interfaces/bank.interface';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankFormComponent implements OnInit, OnDestroy {

  @Input() bankForm = new BankFormModel();

  @Input() bank?: IBank;

  @Output() formState = new EventEmitter<BankFormModel>();

  destroy$ = new Subject<void>();

  ngOnInit(): void {    
    this.bankForm.statusChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => this.formState.emit(this.bankForm)
    );
    this.getDetailData();
  }

  getDetailData(): void {
    if (this.bank) {
      this.bankForm.setValue({
        swift: this.bank.swift,
        bank_name: this.bank.bank_name,
        cis: this.bank.cis,
        branch_name: this.bank.branch_name,
        address: this.bank.address,
        phone_number: this.bank.phone_number,
        email: this.bank.email,
        active: this.bank.active
      });
    }
  }

  isValidField(field: string): boolean {
    return this.bankForm.controls[field].touched && this.bankForm.controls[field].invalid;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
