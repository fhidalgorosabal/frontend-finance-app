import { ILabel } from "./label.interface";

export interface IAccount {
  id?: number;
  code: string;
  description: string;
  currency_id: number;
  bank_id: number;
  active?: boolean | string;
}

export interface IAccountData {
  currencies: ILabel[];
  banks: ILabel[];
  account?: IAccount;
}
