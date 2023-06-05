import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, switchMap, tap,  } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { TableService } from 'src/app/services/table.service';
import { MessageService } from 'primeng/api';
import { CurrencyFormModel } from '../currency-form/currency-form.model';
import { ICurrency } from 'src/app/interfaces/currency.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Output() closeDetails = new EventEmitter<boolean>();

  id: number | null = null;

  displayForm = false;

  currency?: ICurrency;

  currencyForm: CurrencyFormModel;

  saving = false;

  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private tableService: TableService
  ) {
    this.currencyForm = new CurrencyFormModel();
   }

   ngOnInit(): void {       
    if (this.actionDetails === ACTION_TYPE.DETAIL) {
      this.getDetailCurrency().subscribe();
    } else {      
      this.displayForm = true;
    }
  }

  getDetailCurrency(): Observable<ICurrency> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.currencyService.getCurrency(detailId) ),
      tap( currency => {
        this.currency = currency;        
        this.displayForm = true;
      })
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles de la moneda' : 'Crear moneda';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.currencyForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: CurrencyFormModel): void {
    this.currencyForm = form;
  }

  isInvalidForm(): boolean {
    return this.currencyForm.invalid;
  }

  save(): void {
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createCurrency() : this.editCurrency();
  }

  createCurrency(): void {
    this.currencyService.createCurrency(this.getFormCurrency()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('¡Nueva moneda!', res));
        this.close();
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  editCurrency(): void {
    if (this.id) {
      this.currencyService.editCurrency(this.getFormCurrency(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('¡Moneda actualizada!', res));
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

  private getFormCurrency(): ICurrency {
    const dataForm = this.currencyForm.value;
    return { 
      initials: dataForm.initials,
      description: dataForm.description,
      exchange_rate: dataForm.exchange_rate,
      is_default: false
    };
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }

}
