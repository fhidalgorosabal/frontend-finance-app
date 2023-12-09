import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, forkJoin } from 'rxjs';
import { catchError, map, first, switchMap, tap } from 'rxjs/operators';
import { ConceptService } from 'src/app/services/concept.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { AccountService } from 'src/app/services/account.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { TableService } from 'src/app/services/table.service';
import { SessionService } from 'src/app/services/sesion.service';
import { ReceiptFormModel } from 'src/app/components/receipt-form/receipt-form.model';
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

  saving = false;

  constructor(
    private receiptService: ReceiptService,
    private conceptService: ConceptService,
    private currencyService: CurrencyService,
    private accountService: AccountService,
    private messageService: MessageService,
    private tableService: TableService,
    private sessionService: SessionService
  ) {
    this.ingressForm = new ReceiptFormModel();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const companyId = this.sessionService?.companyId;
    const concepts$ = this.conceptService.conceptsList( companyId, RECEIPT_TYPE.INGRESS );
    const currencies$ = this.currencyService.currenciesList(companyId);
    const accounts$ = this.accountService.accountsList(companyId);
    const receipt$ = this.getDetailReceipt();

    this.data$ = forkJoin([
      concepts$,
      currencies$,
      accounts$,
      ...(this.actionDetails === ACTION_TYPE.DETAIL ? [receipt$] : [])
    ]).pipe(
      first(),
      map(([concepts, currencies, accounts, receipt]) => {
        return {
          'concepts': concepts,
          'currencies': currencies,
          'accounts': accounts,
          'receipt': receipt
        }
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      }),
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
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del comprobante de ingreso' : 'Crear comprobante de ingreso';
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
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createIngress() : this.editIngress();
  }

  private createIngress(): void {
    this.receiptService.createReceipt(this.getFormReceipt()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('Nuevo ingreso', res));
        this.close();
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  private editIngress(): void {
    if (this.id) {
      this.receiptService.editReceipt(this.getFormReceipt(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('Ingreso actualizado', res));
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

  private getFormReceipt(): IReceipt {
    const dataForm = this.ingressForm.value;
    return {
      date: Utils.dateFormatISO8601(dataForm.date),
      concept_id: dataForm.concept.value,
      type: RECEIPT_TYPE.INGRESS,
      amount: dataForm.amount,
      currency_id: dataForm.currency.value,
      account_id: dataForm.account.value,
      description: dataForm.description,
      company_id: this.sessionService?.companyId
    }
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }
}
