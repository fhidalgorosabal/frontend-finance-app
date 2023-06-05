import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { MessageService } from 'primeng/api';
import { ConceptFormModel } from '../concept-form/concept-form.model';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { IConcept } from 'src/app/interfaces/concept.interface';
import { TableService } from 'src/app/services/table.service';
import { Utils } from 'src/app/shared/utils/utils';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';

@Component({
  selector: 'app-concept-details',
  templateUrl: './concept-details.component.html',
  styleUrls: ['./concept-details.component.scss']
})
export class ConceptDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Input() type?: string;

  @Output() closeDetails = new EventEmitter<boolean>();

  id: number | null = null;

  displayForm = false;

  concept?: IConcept;

  conceptForm: ConceptFormModel;

  saving = false;

  constructor(
    private conceptService: ConceptService,
    private messageService: MessageService,
    private tableService: TableService
  ) {
    this.conceptForm = new ConceptFormModel();
  }

  ngOnInit(): void {       
    if (this.actionDetails === ACTION_TYPE.DETAIL) {
      this.getDetailConcept().subscribe();
    } else {      
      this.displayForm = true;
    }
  }

  getDetailConcept(): Observable<IConcept> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.conceptService.getConcept(detailId) ),
      tap( concept => {
        this.concept = concept;
        this.displayForm = true;
      })
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del concepto' : 'Crear concepto';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.conceptForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: ConceptFormModel): void {
    this.conceptForm = form;
  }

  isInvalidForm(): boolean {
    return this.conceptForm.invalid;
  }

  save(): void {
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createConcept() : this.editConcept();
  }

  createConcept(): void {
    this.conceptService.createConcept(this.getFormConcept()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('¡Nuevo concepto!', res));
        this.close();
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  editConcept(): void {
    if (this.id) {
      this.conceptService.editConcept(this.getFormConcept(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('¡Concepto actualizado!', res));
          this.close();
        }),
        catchError((error) => {
          this.messageService.add(Utils.responseError(error));
          this.saving = false;
          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private getFormConcept(): IConcept {
    const dataForm = this.conceptForm.value;
    return { 
      description: dataForm.description,
      type: this.type ? this.type : RECEIPT_TYPE.EXPENSE
    };
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }

}
