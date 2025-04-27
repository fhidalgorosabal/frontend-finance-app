export interface IBank {
  id?: number;
  swift: string;
  bankName: string;
  cis: string;
  branchName: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  active?: boolean | string;
}
