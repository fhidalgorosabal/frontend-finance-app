import { ILabel } from './label.interface';

export interface IReceiptResponse {
  id: number;
  date: string;
  concept_id: string;
  actual_amount: number;
}

export interface IReceipt {
  date: string;
  concept_id: string;
  type: string;
  amount: number;
  currency_id: string;
  actual_amount?: number;
  description?: string;
}

export interface IReceiptData {
  concepts: ILabel[];
  currencies: ILabel[];
  receipt?: IReceipt;
}
