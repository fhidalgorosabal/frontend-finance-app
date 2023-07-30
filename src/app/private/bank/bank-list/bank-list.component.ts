import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, first } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IBank } from 'src/app/interfaces/bank.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  title: string = 'Bancos';

  banks$ = new Observable<IBank[]>();

  columnData: ILabel[] = [
    { label: 'Banco', value: 'bank_name', type: 'uppercase'},
    { label: 'Sucursal', value: 'cis'},
    { label: 'Estado', value: 'active', type: 'status'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private bankService: BankService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks(): void {
    this.banks$ = this.bankService.getBanks()
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay bancos para mostrar',
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
      this.getBanks();
    }
    this.displayDetails = false;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar este banco?',
        accept: () => {
          this.deleteBank(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteBank(id: number): void {
    this.bankService.deleteBank(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Banco eliminado!', res));
        this.getBanks();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }

}
