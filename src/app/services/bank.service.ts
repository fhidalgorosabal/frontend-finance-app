import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { IBank } from '../interfaces/bank.interface';
import { ILabel } from '../interfaces/label.interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getBanks(): Observable<IBank[]> {
    return this.http.get<IResponse>(`${ this._url }/bank`)
      .pipe(
        map((res) => res.data.map((bank: IBank) => ({
          ...bank,
          active: bank.active ? 'Active' : 'Inactive'
        })))
      );
  }  

  getBank(id: number | null): Observable<IBank> {
    return this.http.get<IResponse>(`${ this._url }/bank/${ id }`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  banksList(): Observable<ILabel[]> {
    return this.getBanks().pipe(
      map(
        (data) => data.filter(data => data.active === 'Active').map(data => ({ 
          label: data.bank_name, value: data.id 
        }))
      )
    );
  }

  createBank(bank: IBank): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/bank`, bank);
  }

  editBank(bank: IBank, id: number): Observable<IResponse> {
    return this.http.patch<IResponse>(`${ this._url }/bank/${ id }`, bank);
  }

  deleteBank(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${ this._url }/bank/${ id }`);
  }

}
