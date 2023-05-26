export class Utils {

  static dateFormat(date: string | number | Date): string {
    const newDate = new Date(date)
    return `${newDate.getFullYear()}/0${(newDate.getMonth() + 1).toString().slice(-2)}/0${(newDate.getDay()).toString().slice(-2)}`;
  }

  static dateFormatDate(date: string | number | Date): Date {
    const newDate = this.dateFormat(date);
    return new Date(newDate);
  }

  static dateType(date: string) :string {
    return date.replace(/-/g, '/');
  }

}
