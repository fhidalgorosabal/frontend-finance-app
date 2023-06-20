export interface IBank {
  id?: number;
  swift: string;
  bank_name: string;
  cis: string;
  branch_name: string;
  address?: string;
  phone_number?: string;
  email?: string;
  active?: boolean;
}
