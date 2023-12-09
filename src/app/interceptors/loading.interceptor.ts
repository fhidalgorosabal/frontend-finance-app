import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MainBusyService } from '../services/main-busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private mainBusyService: MainBusyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.count++;
    this.mainBusyService.isLoading$.next(true);   

    return next.handle(request).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.mainBusyService.isLoading$.next(false);
        }      
      }),
    );
  }
}
