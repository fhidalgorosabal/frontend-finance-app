import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IReceiptData, IReceiptResponse } from '../shared/interfaces/receipt.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  receiptsList(receiptType: string): Observable<IReceiptData[]> {
    return this.http.post<IReceiptResponse>(`${ this._url }/receipt/list`, { type: receiptType })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

}
