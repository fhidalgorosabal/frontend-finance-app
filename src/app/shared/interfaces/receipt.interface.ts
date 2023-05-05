export interface IReceiptResponse {
  status: string;
  message: string;
  data: IReceiptData[];
}

export interface IReceiptData {
  id: number;
  amount: number;
  date: Date;
  concept: string;
  type: string;
  currency: string;
  actual_amount: number;
}
