export interface ICurrency {
  id?: number;
  initials: string;
  description: string;
  exchange_rate: number;
  is_default?: boolean;
  company_id: number;
  active?: boolean | string;
}
