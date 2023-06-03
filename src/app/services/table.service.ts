import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  detailId$ = new BehaviorSubject<number | null>(null);

  setDetailId(id: number | null) {
    this.detailId$.next(id);
  }

  get detailId() {
    return this.detailId$;
  }

}
