import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { IConceptData } from '../interfaces/concept.interface';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  conceptsList(conceptType: string): Observable<IConceptData[]> {
    return this.http.get<IResponse>(`${ this._url }/concept`)
      .pipe(
        map(
          (res) => res.data.filter(data => data.type === conceptType)
        )
      );
  }
}
