import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReceipt, IReceiptResponse } from '../interfaces/receipt.interface';
import { IResponse } from '../interfaces/response.interface';
import { Utils } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }
  
  receiptsList(companyId: number, receiptType: string): Observable<IReceiptResponse[]> {
    return this.http.post<IResponse>(`${this._url}/receipt/list`, { company_id: companyId, type: receiptType })
      .pipe(
        map((res) => res.data.map((receipt: IReceipt) => ({
          ...receipt,
          date: Utils.dateFormatFilter(receipt.date)
        })))
      );
  }

  getReceipt(id: number | null): Observable<IReceipt> {
    return this.http.get<IResponse>(`${ this._url }/receipt/${ id }`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  createReceipt(receipt: IReceipt): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/receipt`, receipt);
  }

  editReceipt(receipt: IReceipt, id: number): Observable<IResponse> {
    return this.http.patch<IResponse>(`${ this._url }/receipt/${ id }`, receipt);
  }

  deleteReceipt(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${ this._url }/receipt/${ id }`);
  }

}
