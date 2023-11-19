import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISetting } from '../interfaces/setting.interface';
import { IResponse } from '../interfaces/response.interface';
import { ILabel } from '../interfaces/label.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getSetting(): Observable<ISetting> {
    return this.http.get<IResponse>(`${ this._url }/setting`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  closeOfMonth(month: number): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/setting/change-month`, { month: month });
  }

  getType(): ILabel[] {
    return [
      { label: 'Empresa', value: 1 },
      { label: 'Personal', value: 2 },
    ];
  }

  getMonths(): ILabel[] {
    return [
      { label: 'Enero', value: 1 },
      { label: 'Febrero', value: 2 },
      { label: 'Marzo', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Mayo', value: 5 },
      { label: 'Junio', value: 6 },
      { label: 'Julio', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Septiembre', value: 9 },
      { label: 'Octubre', value: 10 },
      { label: 'Noviembre', value: 11 },
      { label: 'Diciembre', value: 12 },
    ];
  }
}
