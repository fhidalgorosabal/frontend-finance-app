import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';
import { ICredentials } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _accessToken!: string;
  _tokenType!: string;
  _expiresIn!: string;
  _companyId!: number;
  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getLoggedIn$(): BehaviorSubject<boolean> {
    return this._loggedIn;
  }

  get loggedIn(): boolean {
    return this._loggedIn.getValue();
  }
  set loggedIn(value: boolean) {
    this._loggedIn.next(value);
  }

  get accessToken(): string {
    return this._accessToken;
  }
  set accessToken(value: string) {
    this._accessToken = value;
  }

  get tokenType(): string {
    return this._tokenType;
  }
  set tokenType(value: string) {
    this._tokenType = value;
  }

  get expiresIn(): string {
    return this._expiresIn;
  }
  set expiresIn(value: string) {
    this._expiresIn = value;
  }

  get companyId(): number {
    return this._companyId;
  }
  set companyId(value: number) {
    this._companyId = value;
  }

  login(credentials: ICredentials): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/login`, credentials);
  }

  logout(): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/logout`, {});
  }
}
