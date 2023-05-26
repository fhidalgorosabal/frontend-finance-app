import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  links: MenuItem[] = [];
  notifications: MenuItem[] = [];

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setLinks();
    this.setNotifications();
  }

  private setLinks() {
    this.links = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
          label:'Gastos',
          icon:'pi pi-shopping-cart',
          items:[
              {
                  label:'Gastos',
                  routerLink: '/expense'
              },
              {
                  separator:true
              },
              {
                  label:'Pagos',
                  routerLink:'/expense'
              },
              {
                  label:'Liquidación',
                  routerLink:'/expense'
              }
          ]
      },
      {
          label:'Ingresos',
          icon:'pi pi-money-bill',
          items:[
              {
                  label:'Ingresos',
                  routerLink: '/ingress'
              },
              {
                  separator:true
              },
              {
                  label:'Cobros',
                  routerLink:'/ingress'
              },
              {
                  label:'Liquidación',
                  routerLink:'/ingress'
              }
          ]
      },
      {
          label:'Categorías',
          icon:'pi pi-th-large',
          items:[
            {
                label:'Conceptos',
                routerLink:'concept'
            },
            {
              label:'Monedas',
              routerLink:'currency'
            },
            {
              label:'Clientes',
              routerLink:'customer'
            },
            {
              label:'Proveedores',
              routerLink:'Provider'
            }
          ]
      },
      {
          label:'Configuración',
          icon:'pi pi-cog'
      }
    ];
  }

  private setNotifications() {
    this.notifications = [
      {
        label: 'Notificación 1'
      },
      {
        label: 'Notificación 2'
      }
    ];
  }

  confirmExit() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea salir de la aplicación?',
        accept: () => {
            console.log('Salir');
        },
        acceptLabel: 'Salir',
        acceptIcon: 'pi pi-power-off',
        acceptButtonStyleClass: 'p-button-secondary',
        rejectLabel: 'Cancelar',
        rejectButtonStyleClass: 'p-button-danger'
    });
}

}
