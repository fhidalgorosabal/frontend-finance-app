export class Utils {

  static dateFormat(date: string): string {
    const newDate = new Date(date)
    return `${newDate.getFullYear()}/0${(newDate.getMonth() + 1).toString().slice(-2)}/0${(newDate.getDay()).toString().slice(-2)}`;
  }

}
