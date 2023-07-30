import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, first } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IAccount } from 'src/app/interfaces/account.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  title: string = 'Cuentas';

  accounts$ = new Observable<IAccount[]>();

  columnData: ILabel[] = [
    { label: 'Código', value: 'code', type: 'uppercase'},
    { label: 'Descripción', value: 'description', type: 'titlecase'},
    { label: 'Estado', value: 'active', type: 'status'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accounts$ = this.accountService.getAccounts()
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay cuentas para mostrar',
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
      this.getAccounts();
    }
    this.displayDetails = false;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar esta cuenta?',
        accept: () => {
          this.deleteAccount(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteAccount(id: number): void {
    this.accountService.deleteAccount(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Cuenta eliminada!', res));
        this.getAccounts();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }

}
