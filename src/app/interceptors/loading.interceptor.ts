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

  private isLoading = false;

  constructor(private mainBusyService: MainBusyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isLoading) {
      this.isLoading = true;
      this.mainBusyService.isLoading$.next(true);      
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.isLoading = false;
        this.mainBusyService.isLoading$.next(false);        
      }),
    );
  }
}
