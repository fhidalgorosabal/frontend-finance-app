export interface IDataMonth {
    type: string;
    month: string;
    companyId: number;
}

export interface ISummary {
    expenses: number;
    ingress: number;
    result: number;
}

export interface IDataConcepts {
    id: number;
    conceptDescription: string;
    type: string;
    totalAmount: number;
}

export interface IDataIngressAndExpenses {
    type: string;
    values: number[]
}