import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { ReceiptService } from 'src/app/services/receipt.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Utils } from 'src/app/shared/utils/utils';
import { IReceiptResponse } from 'src/app/interfaces/receipt.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';


@Component({
  selector: 'app-ingress-list',
  templateUrl: './ingress-list.component.html',
  styleUrls: ['./ingress-list.component.scss']
})
export class IngressListComponent implements OnInit {

  title: string = 'Ingresos';

  ingress$ = new Observable<IReceiptResponse[]>();

  columnData: ILabel[] = [
    { label: 'Fecha', value: 'date', type: 'date'},
    { label: 'Concepto', value: 'concept'},
    { label: 'Importe Real', value: 'actual_amount', type: 'currency'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private receiptService: ReceiptService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.ingressList();
  }

  ingressList(): void {
    this.ingress$ = this.receiptService.receiptsList( RECEIPT_TYPE.INGRESS )
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay comprobantes de ingreso para mostrar',
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

  showDialogDetails(action: ACTION_TYPE) {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(event: boolean) {
    if (event) {
      this.ingressList();
    }
    this.displayDetails = false;
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar este comprobante de ingreso?',
        accept: () => {
          this.deleteIngress(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteIngress(id: number) {
    this.receiptService.deleteReceipt(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Ingreso eliminado!', res));
        this.ingressList();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }
}
