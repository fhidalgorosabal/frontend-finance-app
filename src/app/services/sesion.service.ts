import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  loggedIn_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoggedIn$(): BehaviorSubject<boolean> {
    return this.loggedIn_;
  }

  get loggedIn(): boolean {
    return this.loggedIn_.getValue();
  }

  set loggedIn(value: boolean) {
    this.loggedIn_.next(value);
  }
}
