import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, first } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/sesion.service';
import { IConcept } from 'src/app/interfaces/concept.interface';
import { ILabel } from 'src/app/interfaces/label.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';

@Component({
  selector: 'app-concept-list',
  templateUrl: './concept-list.component.html',
  styleUrls: ['./concept-list.component.scss']
})
export class ConceptListComponent implements OnInit {

  title: string = 'Conceptos';

  concepts$ = new Observable<IConcept[]>();

  types: ILabel[] = [
    { label: 'Gastos', value: 'Expense'},
    { label: 'Ingresos', value: 'Ingress'},
  ]

  typeConcept: ILabel = { label: 'Gastos', value: RECEIPT_TYPE.EXPENSE};

  columnData: ILabel[] = [
    { label: 'Id Concepto', value: 'id'},
    { label: 'Descripción', value: 'description', type: 'titlecase'}
  ];

  actionDetails = ACTION_TYPE.DETAIL;

  displayDetails = false;

  constructor(
    private conceptService: ConceptService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getConcepts();
  }

  getType(): RECEIPT_TYPE | undefined {
    return this.typeConcept.value as RECEIPT_TYPE;
  }

  getConcepts(): void {
    const type = this.getType();
    this.concepts$ = this.conceptService.getConcepts( this.sessionService?.companyId, type )
    .pipe(
      tap( res => {      
        if (res.length === 0) {
          this.messageService.add({
            severity: 'warn', 
            summary: '¡Atención!', 
            detail: 'No hay conceptos para mostrar',
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
      this.getConcepts();
    }
    this.displayDetails = false;
  }

  confirmDelete(id: number): void {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar este concepto?',
        accept: () => {
          this.deleteConcept(id);
        },
        acceptLabel: 'Eliminar',
        acceptIcon: 'pi pi-trash',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  deleteConcept(id: number): void {
    this.conceptService.deleteConcept(id).pipe(
      first(),
      tap(res => {
        this.messageService.add(Utils.messageServiceTitle('¡Concepto eliminado!', res));
        this.getConcepts();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe();
  }

}
