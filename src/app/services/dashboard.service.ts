import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';
import { IDataMonthTotal } from '../interfaces/dashboard.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getMonthTotal(data: IDataMonthTotal): Observable<number> {
    return this.http.post<IResponse>(`${ this._url }/dashboard/get-month-total`, { ...data })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

}
