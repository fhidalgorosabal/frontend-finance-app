import { IError, IResponse } from "src/app/interfaces/response.interface";
import { Message } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";

const LITERAL_ERROR = 'error';

export class Utils {
  
  /*
  |--------------------------------------------------------------------------
  | Utils Date
  |--------------------------------------------------------------------------
  |
  */
  static dateFormatISO8601(date: string | number | Date): string {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);  
    const month = (newDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getUTCDate().toString().padStart(2, '0');
    return `${newDate.getUTCFullYear()}/${month}/${day}`;
  }

  static dateFormatFilter(date: string): string {
    const value = this.dateFormatISO8601(date);
    const parts = value.split('/');  
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  static dateFormatDate(date: string | number | Date): Date {
    const value = this.dateFormatISO8601(date);
    const newDate = new Date(value);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate;
  }

  static dateType(date: string) :string {
    return date.replace(/-/g, '/');
  }

  
  /*
  |--------------------------------------------------------------------------
  | Utils Error
  |--------------------------------------------------------------------------
  |
  */

  static responseError(error: IError | HttpErrorResponse): Message {    
    return (error?.error?.status && error?.error?.status.includes(LITERAL_ERROR)) 
      ? this.getAppError(error) 
      : this.getHttpErrorResponse(error as HttpErrorResponse);
  }

  static messageServiceTitle(title: string, res: IResponse): Message {
    return { 
      severity: res?.status, 
      summary: title,
      detail: res?.message,
      life: 6000
    };
  }

  static getAppError(error: IError) {
    return { 
      severity: error?.error?.status, 
      summary: error?.error?.message, 
      detail: this.createErrorList(error?.error?.errors),
      life: 6000 
    };
  }

  static getHttpErrorResponse(error: HttpErrorResponse) {
    return {
      severity: LITERAL_ERROR, 
      summary: error?.name, 
      detail: error?.error?.message,
      life: 6000 
    };
  }

  static createErrorList(errores: { [key: string]: string }): string {    
    return errores ? Object.values(errores).join(', ') : LITERAL_ERROR;
  }

}
