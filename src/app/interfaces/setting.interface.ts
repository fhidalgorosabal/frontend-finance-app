export interface ISetting {
    company_code: string;
    company_name: string;
    current_month: string;
    current_year: string;
    type: string;
}

export interface IClose {
    company_id: number;
}

export interface ICloseMonth extends IClose {
    month: number;
}