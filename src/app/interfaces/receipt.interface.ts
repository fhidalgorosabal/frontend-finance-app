import { ILabel } from './label.interface';

export interface IReceiptResponse {
  id: number;
  date: string;
  concept_id: string;
  actual_amount: number;
}

export interface IReceipt {
  date: string;
  concept_id: number;
  type: string;
  amount: number;
  currency_id: number;
  actual_amount?: number;
  account_id: number;
  description?: string;
  company_id: number;
}

export interface IReceiptData {
  concepts: ILabel[];
  currencies: ILabel[];
  accounts: ILabel[];
  receipt?: IReceipt;
}
