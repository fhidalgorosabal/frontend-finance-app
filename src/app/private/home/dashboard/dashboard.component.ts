import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ISummary } from 'src/app/interfaces/dashboard.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SessionService } from 'src/app/services/sesion.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] = [];
  summary$ = new Observable<ISummary>();

  constructor(
    private messageService: MessageService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private settingService: SettingService,
  ) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'Options',
          items: [{
              label: 'Update',
              icon: 'pi pi-refresh',
              command: () => {
                  this.update();
              }
          },
          {
              label: 'Delete',
              icon: 'pi pi-times',
              command: () => {
                  this.delete();
              }
          }
      ]},
      {
          label: 'Navigate',
          items: [{
              label: 'Angular Website',
              icon: 'pi pi-external-link',
              url: 'http://angular.io'
          },
          {
              label: 'Router',
              icon: 'pi pi-upload',
              routerLink: '/fileupload'
          }
      ]}
    ];
    this.summary$ = this.getMonthTotalValues$();
  }

  update() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }

  delete() {
    this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
  }

  getMonthTotalValues$(): Observable<ISummary> {
    const companyId = this.sessionService.companyId;
  
    return this.settingService.getSetting(companyId).pipe(
      switchMap((setting) => {
        const month = setting.current_month;
        
        const expense$ = this.dashboardService.getMonthTotal({
          type: RECEIPT_TYPE.EXPENSE.toString(),
          month,
          company_id: companyId,
        });
  
        const ingress$ = this.dashboardService.getMonthTotal({
          type: RECEIPT_TYPE.INGRESS.toString(),
          month,
          company_id: companyId,
        });
  
        return forkJoin({ expenses: expense$, ingress: ingress$ }).pipe(
          map(({ expenses, ingress }) => ({
            expenses,
            ingress,
            result: ingress - expenses,
          }))
        );
      })
    );
  }
  
  isPositive(value: number) {
    return value >= 0;
  }

}
