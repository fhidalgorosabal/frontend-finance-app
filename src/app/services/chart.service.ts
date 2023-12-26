import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SeriesOptionsType, SeriesColumnOptions } from 'highcharts/highcharts';
import { RECEIPT_TYPE } from '../enums/receipt.enum';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
    
  getChartOptions(serieChart: SeriesOptionsType[], type: string, title: string, categories?: string[]): Highcharts.Options {
    const commonOptions: Highcharts.Options = this.getCommonOptions(serieChart, type, title);  
    if (type === 'column' || type === 'line') {
      return {
        ...commonOptions,
        plotOptions: {
          column: {
            dataLabels: {
                enabled: true,
                style: {
                  fontSize: '.8em',
                }
            },
            pointPadding: 0.2,
            borderWidth: 0,
            groupPadding: 0.1
          },
          series: {
            allowPointSelect: true,
            cursor: 'pointer',
          },
        },
        xAxis: {
          categories: categories,
          crosshair: true,
          accessibility: {
            description: 'Meses',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Importes',
          },
        },
      };
    } else {
      return {
        ...commonOptions,
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
              enabled: false
            }, {
                enabled: true,
                format: '{point.y}',
                style: {
                    fontSize: '1em',
                    textOutline: 'none',
                    opacity: 0.7           
                }              
            }],
            showInLegend: true,
          },
        },
      };
    }
  }

  private getCommonOptions(serieChart: SeriesOptionsType[], type: string, title: string) {
    return {
      chart: {
        plotBackgroundColor: 'transparent',
        type: type,
      },
      title: {
        text: title,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
      exporting: {
        enabled: true,
      },
      series: serieChart,
    };
  }

  getRandomColor(type: RECEIPT_TYPE): string {
    const nonGrayThreshold = 64;
    const redComponent = this.getRandomHexValue(nonGrayThreshold, 255);
    const greenComponent = this.getRandomHexValue(nonGrayThreshold, 255);
    const blueComponent = this.getRandomHexValue(nonGrayThreshold, 255);

    return type === RECEIPT_TYPE.INGRESS ? `#00${greenComponent}${blueComponent}` : `#${redComponent}00${blueComponent}`;
  }
  
  private getRandomHexValue(min: number, max: number): string {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue.toString(16).padStart(2, '0');
  }

}
