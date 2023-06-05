import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { IConcept } from '../interfaces/concept.interface';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  conceptsList(conceptType?: string): Observable<IConcept[]> {    
    return this.http.get<IResponse>(`${ this._url }/concept`)
      .pipe(
        map(
          (res) => res.data.filter((data: IConcept) => data.type === conceptType)
        )
      );
  }

  getConcept(id: number | null): Observable<IConcept> {
    return this.http.get<IResponse>(`${ this._url }/concept/${ id }`)
      .pipe(
        map(
          (res) => res.data
        )
      );
  }

  createConcept(concept: IConcept): Observable<IResponse> {
    return this.http.post<IResponse>(`${ this._url }/concept`, concept);
  }

  editConcept(concept: IConcept, id: number): Observable<IResponse> {
    return this.http.patch<IResponse>(`${ this._url }/concept/${ id }`, concept);
  }

  deleteConcept(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${ this._url }/concept/${ id }`);
  }

}
