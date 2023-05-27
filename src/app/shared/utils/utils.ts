export class Utils {

  static dateFormat(date: string | number | Date): string {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

    return `${newDate.getFullYear()}/${month}/${day}`;
  }


  static dateFormatDate(date: string | number | Date): Date {
    const newDate = this.dateFormat(date);
    return new Date(newDate);
  }

  static dateType(date: string) :string {
    return date.replace(/-/g, '/');
  }

}
