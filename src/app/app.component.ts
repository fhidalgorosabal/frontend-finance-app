import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {

  title = 'FinanceApp';

  links: MenuItem[] = [
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
              routerLink:'/concept'
          },
          {
            label:'Monedas',
            routerLink:'/currency'
          },
          {
            label:'Cuentas',
            routerLink:'/account'
          },
          {
            label:'Bancos',
            routerLink:'/bank'
          },
          {
            label:'Clientes',
            routerLink:'/customer'
          },
          {
            label:'Proveedores',
            routerLink:'/provider'
          }
        ]
    },
    {
        label:'Configuración',
        icon:'pi pi-cog',
        routerLink: '/setting'
    }
  ];
  notifications: MenuItem[] = [
    {
      label: 'Notificación 1'
    },
    {
      label: 'Notificación 2'
    }
  ];

  constructor(private messageService: MessageService) {}
}
