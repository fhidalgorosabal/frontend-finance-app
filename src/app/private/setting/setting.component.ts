import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { SettingFormModel } from './setting-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingForm = new SettingFormModel();
  optionsType: ILabel[];
  months: ILabel[];

  constructor(
    private settingService: SettingService,
    private confirmationService: ConfirmationService
  ) {
    this.optionsType = this.settingService.getType();
    this.months = this.settingService.getMonths();
   }

  ngOnInit(): void {
    this.settingService.getSetting().subscribe(res => {
      this.settingForm.setValue({
        company_code: res.company_code,
        company_name: res.company_name,
        company_type: this.optionsType.find(item => item.value === 2)?.label,
        current_month: this.months.find(item => item.value == res.current_month)?.label,
        current_year: res.current_year
      })
    });    
  }

  changeMonth() {
    this.confirmationService.confirm({
        header: 'Cerrar mes',
        message: '¿Está seguro que desea realizar el cierre de mes? Tenga en cuenta que este cambio no se puede revertir.',
        accept: () => {
            console.log('Cerrar mes');
        },
        acceptLabel: 'Cerrar',
        acceptIcon: 'pi pi-power-off',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

}
