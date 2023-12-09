import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { BankService } from 'src/app/services/bank.service';
import { TableService } from 'src/app/services/table.service';
import { MessageService } from 'primeng/api';
import { BankFormModel } from '../bank-form/bank-form.model';
import { IBank } from 'src/app/interfaces/bank.interface';
import { ACTION_TYPE } from 'src/app/enums/actions.enum';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  @Input() actionDetails = ACTION_TYPE.DETAIL;

  @Input() displayDetails = false;

  @Output() closeDetails = new EventEmitter<boolean>();

  id: number | null = null;

  displayForm = false;

  bank?: IBank;

  bankForm: BankFormModel;

  saving = false;

  constructor(
    private bankService: BankService,
    private messageService: MessageService,
    private tableService: TableService
  ) {
    this.bankForm = new BankFormModel();
   }

   ngOnInit(): void {       
    if (this.actionDetails === ACTION_TYPE.DETAIL) {
      this.getDetailBank().subscribe();
    } else {      
      this.displayForm = true;
    }
  }

  getDetailBank(): Observable<IBank> {
    return this.tableService.detailId.asObservable().pipe(
      first(),
      tap( detailId => this.id = detailId ),
      switchMap( detailId => this.bankService.getBank(detailId) ),
      tap( bank => {
        this.bank = bank;        
        this.displayForm = true;
      })
    );
  }

  getTitle(actionDetails: ACTION_TYPE): string {
    return (actionDetails === ACTION_TYPE.DETAIL) ? 'Detalles del banco' : 'Crear banco';
  }

  showDialogDetails(action: ACTION_TYPE): void {
    this.actionDetails = action;
    this.displayDetails = true;
  }

  cancelDialogDetails(): void {
    this.bankForm.reset();
    this.displayDetails = false;
    this.closeDetails.emit(false);
  }

  setForm(form: BankFormModel): void {
    this.bankForm = form;
  }

  isInvalidForm(): boolean {
    return this.bankForm.invalid;
  }

  save(): void {
    this.saving = true;
    (this.actionDetails === ACTION_TYPE.CREATE) ? this.createBank() : this.editBank();
  }

  createBank(): void {
    this.bankService.createBank(this.getFormBank()).pipe(
      first(),
      tap((res) => {
        this.messageService.add(Utils.messageServiceTitle('Nuevo banco', res));
        this.close();
      }),
      catchError((error) => {        
        this.messageService.add(Utils.responseError(error));
        this.saving = false;
        return EMPTY;
      }),
    ).subscribe();
  }

  editBank(): void {
    if (this.id) {
      this.bankService.editBank(this.getFormBank(), this.id).pipe(
        first(),
        tap((res) => {
          this.messageService.add(Utils.messageServiceTitle('Banco actualizado', res));
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

  private getFormBank(): IBank {
    const dataForm = this.bankForm.value;
    return { 
      swift: dataForm.swift,
      bank_name: dataForm.bank_name,
      cis: dataForm.cis,
      branch_name: dataForm.branch_name,
      address: dataForm.address,
      phone_number: dataForm.phone_number,
      email: dataForm.email,
      active: dataForm.active
    };
  }

  private close(): void {
    this.displayDetails = false;
    this.closeDetails.emit(true);
  }

}
