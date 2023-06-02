import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { ICurrencyData } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  currenciesList(): Observable<ICurrencyData[]> {
    return this.http.get<IResponse>(`${ this._url }/currency`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }
}
