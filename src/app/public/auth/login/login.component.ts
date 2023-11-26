import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  remember = false;

  constructor(
    private router: Router,
    private sesionService: SesionService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.sesionService.loggedIn = true;
    return this.router.navigate(['/home']);
  }

}
