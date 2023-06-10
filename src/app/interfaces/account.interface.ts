import { ILabel } from "./label.interface";

export interface IAccount {
  id?: number;
  code: string;
  description: string;
  currency_id: number;
  active?: boolean;
}

export interface IAccountData {
  currencies: ILabel[];
  account?: IAccount;
}
