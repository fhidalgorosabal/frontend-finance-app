import { Injectable } from '@angular/core';
import { SessionService } from './sesion.service';
import { Router } from '@angular/router';
import { IReloadSessionData } from '../interfaces/reload-session.interface';

@Injectable({
  providedIn: 'root'
})
export class ReloadSessionService {

  constructor(private sessionService: SessionService, private router: Router) {     
    this.updateReloadData();
    this.cleanStorage();
  }

  updateReloadData(): void {
    const reloadData: string = String(sessionStorage.getItem('reload_data'));
    const data: IReloadSessionData = JSON.parse(reloadData);
    (data && this.sessionValid(data)) ? this.loadSessionData(data) : this.goToRoute('/login');
  }

  saveOnStorage(): void {
    const url = this.router.url;
    sessionStorage.setItem('reload_data', JSON.stringify(this.getSessionData(url)));    
  }

  private sessionValid(data: IReloadSessionData): boolean {
    const currentDate = new Date();
    const sessionDate = new Date(data?.dateSession).getTime();
    const expireDate = new Date(sessionDate + Number(data?.expiresIn) * 1000);
    return expireDate > currentDate;
  }

  private goToRoute(url: string) {
    return this.router.navigate([url]);
  }

  private loadSessionData(data: IReloadSessionData) {
    this.sessionService.accessToken = data?.accessToken;   
    this.sessionService.tokenType = data?.tokenType;
    this.sessionService.expiresIn = data?.expiresIn;
    this.sessionService.date = data?.dateSession;
    this.sessionService.companyId = data?.companyId;
    this.sessionService.loggedIn = true;
    return this.goToRoute(data?.url);
  }

  private getSessionData(url: string): IReloadSessionData {
    return {
      accessToken: this.sessionService.accessToken,
      tokenType: this.sessionService.tokenType,
      expiresIn: this.sessionService.expiresIn,
      dateSession: this.sessionService.date,
      companyId: this.sessionService.companyId,   
      url: url   
    };
  }

  cleanStorage(): void {
    sessionStorage.removeItem('reload_data');
  }
}
