import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { ICurrency } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  currenciesList(): Observable<ICurrency[]> {
    return this.http.get<IResponse>(`${ this._url }/currency`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  getCurrency(id: number | null): Observable<ICurrency> {
    return this.http.get<IResponse>(`${ this._url }/currency/${ id }`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  createCurrency(currency: ICurrency): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/currency`, currency);
  }

  editCurrency(currency: ICurrency, id: number): Observable<IResponse> {
    return this.http.patch<IResponse>(`${ this._url }/currency/${ id }`, currency);
  }

  deleteCurrency(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${ this._url }/currency/${ id }`);
  }

}
