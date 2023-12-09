import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { EMPTY, Subject } from 'rxjs';
import { catchError, take, takeUntil, tap } from 'rxjs/operators';
import { SessionService } from 'src/app/services/sesion.service';
import { Utils } from '../../utils/utils';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() links: MenuItem[] = [];
  @Input() notifications: MenuItem[] = [];
  showLinks: MenuItem[] = [];
  showNotifications: MenuItem[] = [];
  loggedIn = false;
  destroy$ = new Subject<void>();

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private sessionService: SessionService,    
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {    
    this.sessionService.getLoggedIn$()
    .pipe(takeUntil(this.destroy$)).subscribe(login => {   
      this.setLinks(login);
      this.setNotifications(login);
      this.loggedIn = login;
      this.cdr.detectChanges();
    })
  }

  private setLinks(login: boolean) {
    this.showLinks = login ? this.links : [];
  }

  private setNotifications(login: boolean) {
    this.showNotifications = login ? this.notifications : [];
  }

  confirmExit() {
    this.confirmationService.confirm({
        header: 'Salir',
        message: '¿Está seguro que desea salir de la aplicación?',
        accept: () => {
          this.sessionService.logout()
          .pipe(
            take(1),
            tap((res) => {
              this.sessionService.loggedIn = false;
              this.messageService.add(Utils.messageServiceTitle('Sesión finalizada', res));
              return this.router.navigate(['/login']);
            }),
            catchError((error) => {
              this.messageService.add(Utils.responseError(error));
              return EMPTY;
            })
          ).subscribe()
        },
        acceptLabel: 'Salir',
        acceptIcon: 'pi pi-power-off',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
