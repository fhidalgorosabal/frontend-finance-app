export interface IChartData {
    name: string;
    y: number;
    color?: string;
    sliced?: boolean;
}  

export interface ILegendChart {
    align?: string;
    verticalAlign?: string;
    layout?: string;
    itemMarginTop?: number;
    x?: number;
    className?: string;
    y?: number;
}