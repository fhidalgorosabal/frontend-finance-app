export interface ICurrency {
  id?: number;
  initials: string;
  description: string;
  exchangeRate: number;
  isDefault?: boolean;
  companyId: number;
  active?: boolean | string;
}
