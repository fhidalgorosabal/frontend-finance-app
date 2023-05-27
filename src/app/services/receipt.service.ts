import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReceipt, IReceiptResponse } from '../interfaces/receipt.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  _url: string;

  detailId$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  receiptsList(receiptType: string): Observable<IReceiptResponse[]> {
    return this.http.post<IResponse>(`${ this._url }/receipt/list`, { type: receiptType })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  getReceipt(id: number): Observable<IReceipt> {
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

  setDetailId(id: number) {
    this.detailId$.next(id);
  }

  get detailId() {
    return this.detailId$;
  }

}
