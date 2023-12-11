import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { SettingFormModel } from '../setting-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/sesion.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil, tap, catchError, switchMap, map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/utils/utils';
import { ISetting } from 'src/app/interfaces/setting.interface';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrency } from 'src/app/interfaces/currency.interface';
import { IResponse } from 'src/app/interfaces/response.interface';

@Component({
  selector: 'app-setting',
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.scss']
})
export class SettingManagementComponent implements OnInit, OnDestroy {
  settingForm = new SettingFormModel();
  optionsType: ILabel[];
  optionsCurrency$ = new Observable<ILabel[]>();
  defCurrency!: ICurrency;
  months: ILabel[];
  companyEdit = false;
  type: string;
  closeMonthLabelBotton = 'Cierre de mes';
  destroy$ = new Subject<void>();

  constructor(
    private settingService: SettingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private currencyService: CurrencyService,
  ) {
    this.optionsType = this.settingService.getType();
    this.months = this.settingService.getMonths();
    this.type = this.settingForm.controls['company_type'].value?.value;
   }

  ngOnInit(): void {
    this.getCurrencies();
    this.settingService.getSetting( this.sessionService?.companyId )
    .pipe(
      takeUntil(this.destroy$),
      tap(res => this.setSetting(res)),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();    
  }

  private getCurrencies() {
    this.optionsCurrency$ = this.currencyService.defaultCurrency( this.sessionService?.companyId )
    .pipe(
      tap(defaultCurrency => this.setDefaultCurrency(defaultCurrency)),
      switchMap(() => this.currencyService.currenciesList( this.sessionService?.companyId )),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }) 
    );
  }

  private resetDefaultCurrency() {
    this.setDefaultCurrency(this.defCurrency);
  }

  private setDefaultCurrency(defaultCurrency: ICurrency) {
    const currency = defaultCurrency 
      ? { label: defaultCurrency.initials, value: defaultCurrency.id, type: defaultCurrency?.id?.toString() } 
      : {};
    this.defCurrency = defaultCurrency;  
    this.settingForm.controls['default_currency'].setValue(currency);
  }

  changeDefaultCurrencyConfirm(event: any) {
    this.setDataConfirmation(
      'Cambiar moneda predeterminada',
      '¿Está seguro que desea cambiar la moneda predeterminada?',
      () => this.changeDefaultCurrency(event),
      'Aceptar',
      'pi pi-check',
      () => this.resetDefaultCurrency()
    );    
  }

  changeDefaultCurrency(event: any) {
    const id = event?.value?.value;    
    this.currencyService.changeDefaultCurrency(id)
    .pipe(
      takeUntil(this.destroy$),
      tap(defaultCurrency => {
        this.setDefaultCurrency(defaultCurrency);
        this.messageService.add(Utils.messageServiceTitle(
          'Configuración actualizada', 
          { 
            status: 'success', 
            message: 'Moneda predeterminada actualizada correctamente.' 
          } as IResponse
        ));
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
    ).subscribe(); 
  }

  getCompanyLabel() {
    return `Nombre de la ${ this.type === '1' ? 'compañía' : 'persona' }:`;
  }

  getCode() {
    return this.type === '1' ? 'Código:' : 'NI:';
  }

  private setSetting(setting: ISetting) {
    const month: ILabel  = this.months.find(item => item.value == setting.current_month) as ILabel;
    this.settingForm.controls['company_code'].setValue(setting.company_code);
    this.settingForm.controls['company_name'].setValue(setting.company_name);
    this.settingForm.controls['company_type'].setValue(this.optionsType.find(item => item.value === setting.type));
    this.settingForm.controls['current_month'].setValue(month?.label);
    this.settingForm.controls['current_year'].setValue(setting.current_year);
    if (month?.value === 12) {
      this.closeMonthLabelBotton = 'Cierre de año';
    }
  }

  closeOfMonthConfirm() {
    this.setDataConfirmation(
      'Cerrar mes',
      `¿Está seguro que desea realizar el ${ this.closeMonthLabelBotton.toLowerCase() }? Tenga en cuenta que este cambio no se puede revertir.`,
      () => this.closeOfMonth(),
      'Cerrar',
      'pi pi-power-off',
    );    
  }

  private setDataConfirmation(
    headerText: string, 
    messageText: string, 
    acceptFun: Function, 
    acceptText?: string, 
    acceptIcon?: string, 
    reject?: Function
  ) {
    this.confirmationService.confirm({
        header: headerText,
        message: messageText,
        accept: acceptFun,
        acceptLabel: acceptText ? acceptText : 'Aceptar',
        acceptIcon: acceptIcon ? acceptIcon : 'pi pi-check',
        acceptButtonStyleClass: 'p-button-secondary',
        reject: reject ? reject : () => {},
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  private closeOfMonth() {
    const currentMonth = this.months.find(item => item.label === this.settingForm.controls['current_month'].value)?.value;
    let nextMonth;
    let functionClose$ = new Observable<IResponse>();
    let message = 'Cambio de mes';
    if (currentMonth !== 12) {
      nextMonth = Number(currentMonth) + 1;
      functionClose$ = this.settingService.closeOfMonth({ 
        month: nextMonth, 
        company_id: this.sessionService?.companyId 
      });
    } else {
      functionClose$ = this.settingService.closeOfYear({ 
        company_id: this.sessionService?.companyId 
      });
      message = 'Cierre de año';
    }
    functionClose$.pipe(
      takeUntil(this.destroy$),
      tap(res => {
        this.setSetting(res.data as ISetting);
        this.messageService.add(Utils.messageServiceTitle(message, res));
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
