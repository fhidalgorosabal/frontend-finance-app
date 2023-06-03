import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, combineLatest, of } from 'rxjs';
import { catchError, map, first, switchMap, tap } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { TableService } from 'src/app/services/table.service';
import { ReceiptFormModel } from 'src/app/components/receipt-form/receipt-form.model';
import { ILabel } from 'src/app/interfaces/label.interface';
import { RECEIPT_TYPE } from 'src/app/enums/receipt.enum';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { IReceiptData, IReceipt } from 'src/app/interfaces/receipt.interface';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-ingress-details',
  templateUrl: './ingress-details.component.html',
  styleUrls: ['./ingress-details.component.scss']
})
export class IngressDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Output() closeDetails = new EventEmitter<boolean>();

  data$ = new Observable<IReceiptData>();

  id: number | null = null;

  ingressForm: ReceiptFormModel;

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private messageService: MessageService,
    private tableService: TableService
  ) {
    this.ingressForm = new ReceiptFormModel();
    if (this.actionDetails === ACTION_TYPE.DETAIL) {
      this.getDetailReceipt();
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const concepts$ = this.getConcepts();
    const currencies$ = this.getCurrencies();
    const receipt$ = this.getDetailReceipt();

    this.data$ = combineLatest([
      concepts$,
      currencies$,
      ...(this.actionDetails === ACTION_TYPE.DETAIL ? [receipt$] : [])
    ]).pipe(
      first(),
      map(([concepts, currencies, receipt]) => {
        return {
          'concepts': concepts,
          'currencies': currencies,
          'receipt': receipt
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
    );
  }

  getConcepts(): Observable<ILabel[]> {
    return this.conceptService.conceptsList( RECEIPT_TYPE.INGRESS ).pipe(
      map(
        (data) => data.map(data => ({label: data.description, value: data.id }))
      )
    );
  }

  getCurrencies(): Observable<ILabel[]> {
    return this.currencyService.currenciesList().pipe(
      map(
        (data) => data.map(data => ({label: data.initials, value: data.id }))
      )
    );
  }

  getDetailReceipt(): Observable<IReceipt> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.receiptService.getReceipt(detailId) )
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del comprobante' : 'Crear Comprobante';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.ingressForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: ReceiptFormModel): void {
    this.ingressForm = form;
  }

  isInvalidForm(): boolean {
    return this.ingressForm.invalid;
  }

  save(): void {
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createIngress() : this.editIngress();
  }

  private createIngress(): void {
    this.receiptService.createReceipt(this.getFormReceipt()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('¡Nuevo ingreso!', res));
        this.close();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
    ).subscribe();
  }

  private editIngress(): void {
    if (this.id) {
      this.receiptService.editReceipt(this.getFormReceipt(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('¡Ingreso actualizado!', res));
          this.close();
        }),
        catchError((error) => {
          this.messageService.add(Utils.responseError(error));
          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private getFormReceipt(): IReceipt {
    const dataForm = this.ingressForm.value;
    return {
      date: Utils.dateFormatISO8601(dataForm.date),
      concept_id: dataForm.concept.value,
      type: RECEIPT_TYPE.INGRESS,
      amount: dataForm.amount,
      currency_id: dataForm.currency.value,
      description: dataForm.description
    }
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }
}
