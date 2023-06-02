export interface IResponse {
  status: string;
  message: string;
  data: any[] | any;
}
export interface IError {
  error: IResponseError;
}
export interface IResponseError {
  status: string;
  message: string;
  errors: any[] | any;
}