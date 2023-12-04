import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from '../services/sesion.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(private injector: Injector, private sessionService: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401].includes(error.status)) {
          const router = this.injector.get(Router);
          this.sessionService.loggedIn = false;
          router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
    );
  }
}
