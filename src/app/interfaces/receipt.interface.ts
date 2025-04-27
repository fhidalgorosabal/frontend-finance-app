import { ILabel } from './label.interface';

export interface IReceiptResponse {
  id: number;
  date: string;
  conceptId: string;
  actualAmount: number;
}

export interface IReceipt {
  date: string;
  conceptId: number;
  //type: string;
  amount: number;
  currencyId: number;
  actualAmount?: number;
  accountId: number;
  description?: string;
  companyId: number;
}

export interface IReceiptData {
  concepts: ILabel[];
  currencies: ILabel[];
  accounts: ILabel[];
  receipt?: IReceipt;
}
