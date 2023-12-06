export interface IDataMonthTotal {
    type: string;
    month: string;
    company_id: number;
}

export interface ISummary {
    expenses: number;
    ingress: number;
    result: number;
}