import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  links: MenuItem[] = [];
  notifications: MenuItem[] = [];

  constructor() { }

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
                  label:'Nuevo gasto',
                  routerLink: '/expense'
              },
              {
                  separator:true
              },
              {
                  label:'Nuevo pago',
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
                  label:'Nuevo ingreso',
                  routerLink: '/ingress'
              },
              {
                  separator:true
              },
              {
                  label:'Nuevo cobro',
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

}
