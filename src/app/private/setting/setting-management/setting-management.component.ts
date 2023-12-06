import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { SettingFormModel } from '../setting-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/sesion.service';
import { EMPTY, Subject } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { Utils } from 'src/app/shared/utils/utils';
import { ISetting } from 'src/app/interfaces/setting.interface';

@Component({
  selector: 'app-setting',
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.scss']
})
export class SettingManagementComponent implements OnInit, OnDestroy {
  settingForm = new SettingFormModel();
  optionsType: ILabel[];
  months: ILabel[];
  companyEdit = false;
  type: string;
  destroy$ = new Subject<void>();

  constructor(
    private settingService: SettingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sessionService: SessionService
  ) {
    this.optionsType = this.settingService.getType();
    this.months = this.settingService.getMonths();
    this.type = this.settingForm.controls['company_type'].value?.value;
   }

  ngOnInit(): void {
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

  getHeaderTitle() {
    return `Datos de la ${ this.type === '1' ? 'compañía' : 'persona' }`;
  }

  getCompanyLabel() {
    return `Nombre de la ${ this.type === '1' ? 'compañía' : 'persona' }:`;
  }

  getCode() {
    return this.type === '1' ? 'Código:' : 'NI:';
  }

  private setSetting(setting: ISetting) {
    this.settingForm.setValue({
      company_code: setting.company_code,
      company_name: setting.company_name,
      company_type: this.optionsType.find(item => item.value === setting.type),
      current_month: this.months.find(item => item.value == setting.current_month)?.label,
      current_year: setting.current_year
    })
  }

  closeOfMonthConfirm() {
    this.confirmationService.confirm({
        header: 'Cerrar mes',
        message: '¿Está seguro que desea realizar el cierre de mes? Tenga en cuenta que este cambio no se puede revertir.',
        accept: () => this.closeOfMonth(),
        acceptLabel: 'Cerrar',
        acceptIcon: 'pi pi-power-off',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  private closeOfMonth() {
    const currentMonth = this.months.find(item => item.label === this.settingForm.controls['current_month'].value)?.value;
    let nextMonth;
    if (currentMonth !== 12) {
      nextMonth = Number(currentMonth) + 1;
    } else {
      nextMonth = 1
      //TODO: Change of year
    }
    this.settingService.closeOfMonth(nextMonth)
    .pipe(
      takeUntil(this.destroy$),
      tap(res => {
        this.setSetting(res.data as ISetting);
        this.messageService.add(Utils.messageServiceTitle('Cambio de mes', res));
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
