import { IError, IResponse } from "src/app/interfaces/response.interface";
import { Message } from "primeng/api";

export class Utils {

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

  static createErrorList(errores: { [key: string]: string }): string {
    const mensajesErrores = Object.values(errores);
    return mensajesErrores.join(', ');
  }

  static responseError(error: IError): Message {
    return { 
      severity: error?.error?.status, 
      summary: error?.error?.message, 
      detail: this.createErrorList(error?.error?.errors),
      life: 8000 
    };
  }

  static messageServiceTitle(title: string, res: IResponse): Message {
    return { 
      severity: res?.status, 
      summary: title,
      detail: res.message,
      life: 8000
    };
  }

}
