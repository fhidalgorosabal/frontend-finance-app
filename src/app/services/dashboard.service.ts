import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';
import { IDataConcepts, IDataIngressAndExpenses, IDataMonth } from '../interfaces/dashboard.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getMonthTotal(data: IDataMonth): Observable<number> {
    return this.http.post<IResponse>(`${ this._url }/dashboard/get-month-total`, { ...data })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  getMonthConcepts(data: IDataMonth): Observable<IDataConcepts[]> {
    return this.http.post<IResponse>(`${ this._url }/dashboard/get-month-concepts`, { ...data })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  getIngressAndExpensesByMonth(companyId: number): Observable<IDataIngressAndExpenses[]> {
    return this.http.post<IResponse>(`${ this._url }/dashboard/get-ingress-expenses-month`, { company_id: companyId })
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

}
