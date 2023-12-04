import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response.interface';
import { IConcept } from '../interfaces/concept.interface';
import { RECEIPT_TYPE } from '../enums/receipt.enum';
import { ILabel } from '../interfaces/label.interface';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {

  _url: string;

  constructor(private http: HttpClient) {
    this._url = environment.base_url;
  }

  getConcepts(companyId: number, conceptType?: RECEIPT_TYPE): Observable<IConcept[]> {    
    return this.http.post<IResponse>(`${ this._url }/concept/list`, { company_id: companyId, type: conceptType })
      .pipe(
        map(
          (res) => res.data
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

  conceptsList(companyId: number, type: RECEIPT_TYPE): Observable<ILabel[]> {
    return this.getConcepts( companyId, type ).pipe(
      map(
        (data) => data.map(data => ({label: data.description, value: data.id }))
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
