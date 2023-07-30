import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, first } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICurrency } from 'src/app/interfaces/currency.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  title: string = 'Tipo de monedas';

  currencies$ = new Observable<ICurrency[]>();

  columnData: ILabel[] = [
    { label: 'Sigla', value: 'initials', type: 'uppercase'},
    { label: 'Tipo de cambio', value: 'exchange_rate', type: 'number'},
    { label: 'Estado', value: 'active', type: 'status'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.currencies$ = this.currencyService.getCurrencies()
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay tipos de monedas para mostrar',
            life: 5000
          });  
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    );
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(event: boolean): void {
    if (event) {
      this.getCurrencies();
    }
    this.displayDetails = false;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar esta moneda?',
        accept: () => {
          this.deleteCurrency(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteCurrency(id: number): void {
    this.currencyService.deleteCurrency(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Moneda eliminada!', res));
        this.getCurrencies();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }

}
