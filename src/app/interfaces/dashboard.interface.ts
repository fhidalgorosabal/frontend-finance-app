export interface IDataMonth {
    type: string;
    month: string;
    company_id: number;
}

export interface ISummary {
    expenses: number;
    ingress: number;
    result: number;
}

export interface IDataConcepts {
    id: number;
    concept_description: string;
    type: string;
    total_amount: number;
}

export interface IDataIngressAndExpenses {
    type: string;
    values: number[]
}