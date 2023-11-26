import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { ICredentials } from 'src/app/interfaces/auth.interface';
import { SesionService } from 'src/app/services/sesion.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  credentials: ICredentials = {
    email: '',
    password: ''
  };
  remember = false;
  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private sesionService: SesionService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.sesionService.login(this.credentials)
    .pipe(
      takeUntil(this.destroy$),
      tap(res => {
        this.sesionService.accessToken = res?.data?.token?.access_token;   
        this.sesionService.tokenType = res?.data?.token?.token_type;
        this.sesionService.expiresIn = res?.data?.token?.expires_in;
        this.sesionService.loggedIn = true;
        this.messageService.add(Utils.messageServiceTitle('¡Bienvenido!', res));
        return this.router.navigate(['/home']);
      }),
      catchError((error) => {
        this.messageService.add(Utils.responseError(error));
        return EMPTY;
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
