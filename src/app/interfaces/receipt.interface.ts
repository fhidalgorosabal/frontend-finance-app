export interface IReceiptData {
  id?: number;
  amount: number;
  date: string;
  concept_id: string;
  type: string;
  currency_id: string;
  actual_amount?: number;
  description?: string;
}
