import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { EMPTY, Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SessionService } from 'src/app/services/sesion.service';
import { SettingService } from 'src/app/services/setting.service';
import * as Highcharts from 'highcharts';
import { default as highchartsExporting } from 'highcharts/modules/exporting';
import { default as variablePie } from 'highcharts/modules/variable-pie';
import { SeriesColumnOptions } from 'highcharts/highcharts';
import { ChartService } from 'src/app/services/chart.service';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { IDataIngressAndExpenses, ISummary } from 'src/app/interfaces/dashboard.interface';
import { IChartData } from 'src/app/interfaces/chart.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { Utils } from 'src/app/shared/utils/utils';
import { CHART_TYPE } from 'src/app/enums/chart.enum';

highchartsExporting(Highcharts);
variablePie(Highcharts);

const EXPENSE_TITLE = 'Gastos';
const INGRESS_TITLE = 'Ingresos';
const EXPENSE = 'Expense';
const INGRESS = 'Ingress';
const RESULT_TITLE = 'Beneficios';
const IMPORTE = 'Importe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  summary$ = new Observable<ISummary>();  
  Highcharts = Highcharts;
  chartOptionsMonths: Highcharts.Options = {};
  chartOptionsExpenses: Highcharts.Options = {};
  chartOptionsIngress: Highcharts.Options = {};
  dataMonthConcepts$ = new Observable<boolean>();
  dataReportsForMonth$ = new Observable<Highcharts.SeriesColumnOptions[]>();

  constructor(
    private messageService: MessageService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private settingService: SettingService,
    private chartService: ChartService
  ) {}

  ngOnInit(): void {
    this.summary$ = this.getMonthTotalValues$();
    this.dataReportsForMonth$ = this.getReportsForMonth$();
    this.dataMonthConcepts$ = this.getMonthConcepts$();
  }

  private getMonthTotalValues$(): Observable<ISummary> {
    const companyId = this.sessionService.companyId;
  
    return this.settingService.getSetting(companyId).pipe(
      switchMap((setting) => {
        const month = setting.currentMonth;
        
        const expense$ = this.dashboardService.getMonthTotal({
          type: RECEIPT_TYPE.EXPENSE.toString(),
          month,
          companyId: companyId,
        });
  
        const ingress$ = this.dashboardService.getMonthTotal({
          type: RECEIPT_TYPE.INGRESS.toString(),
          month,
          companyId: companyId,
        });
  
        return forkJoin({ expenses: expense$, ingress: ingress$ }).pipe(
          map(({ expenses, ingress }) => ({
            expenses,
            ingress,
            result: ingress - expenses,
          })),
          catchError((error) => {        
            this.messageService.add(Utils.responseError(error));
            return EMPTY;
          }),
        );
      })
    );
  }

  private getReportsForMonth$():Observable<Highcharts.SeriesColumnOptions[]> {   
    return this.dashboardService.getIngressAndExpensesByMonth( this.sessionService.companyId )
    .pipe(
      map((data: IDataIngressAndExpenses[]) => this.generateColumnChartData(data)),
      tap((result: SeriesColumnOptions[]) => {                    
        this.chartOptionsMonths = this.createColumnChartOptions(result, `${EXPENSE_TITLE} | ${INGRESS_TITLE} | ${RESULT_TITLE}`);  
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    );
  }

  private getMonthConcepts$(): Observable<boolean> {
    const companyId = this.sessionService.companyId;
  
    return this.settingService.getSetting(companyId).pipe(
      switchMap((setting) => {
        const month = setting.currentMonth;
        
        const expense$: Observable<ILabel[]> = this.dashboardService.getMonthConcepts({
          type: RECEIPT_TYPE.EXPENSE.toString(),
          month,
          companyId: companyId,
        }).pipe(
            map(res => res.map(item => ({ 
              label: item.conceptDescription, 
              value: Number(item.totalAmount) 
            })))
          );
  
        const ingress$: Observable<ILabel[]> = this.dashboardService.getMonthConcepts({
          type: RECEIPT_TYPE.INGRESS.toString(),
          month,
          companyId: companyId,
        }).pipe(
            map(res => res.map(item => ({ 
              label: item.conceptDescription, 
              value: Number(item.totalAmount) 
            })))
          );

        return forkJoin({ expensesData: expense$, ingressData: ingress$ }).pipe(
          tap(res => {
            this.chartOptionsExpenses = this.createPieChartOptions(
              res.expensesData, 
              EXPENSE_TITLE, 
              RECEIPT_TYPE.EXPENSE
            );    
            this.chartOptionsIngress = this.createPieChartOptions(
              res.ingressData, 
              INGRESS_TITLE, 
              RECEIPT_TYPE.INGRESS
            );  
          }),
          catchError((error) => {        
            this.messageService.add(Utils.responseError(error));
            return of(false);
          }),
          map(() => true)
        );
      })
    );
  }

  private createColumnChartOptions(inputData: SeriesColumnOptions[], title: string): Highcharts.Options { 
    return this.chartService.getChartOptions(
      inputData, 
      CHART_TYPE.COLUMN, 
      title, 
      this.settingService.getMonths().map(item => item?.label ? item?.label : '')
    );
  }

  private generateColumnChartData(data: IDataIngressAndExpenses[]): SeriesColumnOptions[] {
    const expenses = data.find(item => item.type === EXPENSE);
    const ingress = data.find(item => item.type === INGRESS);

    const expensesData = expenses ? expenses.values.map(value => parseFloat(value.toString())) : [];
    const ingressData = ingress ? ingress.values.map(value => parseFloat(value.toString())) : [];
    const resultData = expensesData.map((expense, index) => ingressData[index] - expense);

    return [
      {
        name: EXPENSE_TITLE,
        data: expensesData,
        color: '#dc3545'
      },
      {
        name: INGRESS_TITLE,
        data: ingressData,
        color: '#198754'
      },
      {
        name: RESULT_TITLE,
        data: resultData,
        color: '#0d6efd'
      }
    ] as SeriesColumnOptions[];
  }

  private createPieChartOptions(inputData: ILabel[], title: string, type: RECEIPT_TYPE): Highcharts.Options { 
    return this.chartService.getChartOptions([{
        name: IMPORTE,
        type: CHART_TYPE.PIE,
        innerSize: '20%',
        data: this.generatePieChartData(inputData, type),
      }], CHART_TYPE.PIE, title);
  }

  private generatePieChartData(inputData: ILabel[], type: RECEIPT_TYPE): IChartData[] {
    return inputData.map(item => ({
      name: item.label,
      y: item.value,
      color: this.chartService.getRandomColor(type)
    }) as IChartData);
  }
  
  isPositive(value: number) {
    return value >= 0;
  }
}
