import { ILabel } from "./label.interface";

export interface IAccount {
  id?: number;
  code: string;
  description: string;
  currencyId: number;
  bankId?: number;
  companyId?: number;
  active?: boolean | string;
}

export interface IAccountData {
  currencies: ILabel[];
  banks: ILabel[];
  account?: IAccount;
}
