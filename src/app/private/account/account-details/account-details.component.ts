import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { catchError, map, first, switchMap, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { TableService } from 'src/app/services/table.service';
import { MessageService } from 'primeng/api';
import { AccountFormModel } from '../account-form/account-form.model';
import { IAccount, IAccountData } from 'src/app/interfaces/account.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';
import { ILabel } from 'src/app/interfaces/label.interface';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Output() closeDetails = new EventEmitter<boolean>();

  data$ = new Observable<IAccountData>();

  id: number | null = null;

  displayForm = false;

  account?: IAccount;

  accountForm: AccountFormModel;

  saving = false;

  constructor(
    private accountService: AccountService,
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private tableService: TableService
  ) {
    this.accountForm = new AccountFormModel();
   }

   ngOnInit(): void {  
    this.getData();
  }

  getData(): void {
    const currencies$ = this.getCurrencies();
    const account$ = this.getDetailAccount();

    this.data$ = combineLatest([
      currencies$,
      ...(this.actionDetails === ACTION_TYPE.DETAIL ? [account$] : [])
    ]).pipe(
      first(),
      map(([currencies, account]) => {
        return {
          'currencies': currencies,
          'account': account,
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
    );
  }

  getCurrencies(): Observable<ILabel[]> {
    return this.currencyService.currenciesList().pipe(
      map(
        (data) => data.map(data => ({label: data.initials, value: data.id }))
      )
    );
  }

  getDetailAccount(): Observable<IAccount> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.accountService.getAccount(detailId) )
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles de la cuenta' : 'Crear cuenta';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.accountForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: AccountFormModel): void {
    this.accountForm = form;
  }

  isInvalidForm(): boolean {
    return this.accountForm.invalid;
  }

  save(): void {
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createAccount() : this.editAccount();
  }

  createAccount(): void {
    this.accountService.createAccount(this.getFormAccount()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('¡Nueva cuenta!', res));
        this.close();
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  editAccount(): void {
    if (this.id) {
      this.accountService.editAccount(this.getFormAccount(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('¡Cuenta actualizada!', res));
          this.close();
        }),
        catchError((error) => {
          this.messageService.add(Utils.responseError(error));
          this.saving = false;
          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private getFormAccount(): IAccount {
    const dataForm = this.accountForm.value;
    return { 
      code: dataForm.code,
      description: dataForm.description,
      currency_id: dataForm.currency.value,
      active: dataForm.active
    };
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }

}