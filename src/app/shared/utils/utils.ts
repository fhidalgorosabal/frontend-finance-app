import { IError, IResponse } from "src/app/interfaces/response.interface";
import { Message } from "primeng/api";

export class Utils {

  static dateFormatISO8601(date: string | number | Date): string {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

    return `${newDate.getFullYear()}/${month}/${day}`;
  }

  static dateFormatDate(date: string | number | Date): Date {
    const newDate = this.dateFormatISO8601(date);
    return new Date(newDate);
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
