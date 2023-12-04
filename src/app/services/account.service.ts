import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { IAccount } from '../interfaces/account.interface';
import { ILabel } from '../interfaces/label.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getAccounts(companyId: number): Observable<IAccount[]> {
    return this.http.post<IResponse>(`${ this._url }/account/list`, { company_id: companyId })
      .pipe(
        map((res) => res.data.map((account: IAccount) => ({
          ...account,
          active: account.active ? 'Active' : 'Inactive'
        })))
      );
  }  

  getAccount(id: number | null): Observable<IAccount> {
    return this.http.get<IResponse>(`${ this._url }/account/${ id }`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  accountsList(companyId: number): Observable<ILabel[]> {
    return this.getAccounts(companyId).pipe(
      map(
        (data) => data.filter(data => data.active === 'Active').map(data => ({
          label: data.description, value: data.id, type: data.currency_id.toString() 
        }))
      )
    );
  }

  createAccount(account: IAccount): Observable<IResponse> {    
    return this.http.post<IResponse>(`${ this._url }/account`, account);
  }

  editAccount(account: IAccount, id: number): Observable<IResponse> {
    return this.http.patch<IResponse>(`${ this._url }/account/${ id }`, account);
  }

  deleteAccount(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${ this._url }/account/${ id }`);
  }

}
