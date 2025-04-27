export interface ISetting {
    companyCode: string;
    companyName: string;
    currentMonth: string;
    currentYear: string;
    type: string;
}

export interface IClose {
    companyId: number;
}

export interface ICloseMonth extends IClose {
    currentMonth: string;
}