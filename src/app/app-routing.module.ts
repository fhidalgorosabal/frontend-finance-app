import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./private/home/home.module').then( m => m.HomeModule )
  },
  {
    path: 'expense',
    loadChildren: () => import('./private/expense/expense.module').then( m => m.ExpenseModule )
  },
  {
    path: 'ingress',
    loadChildren: () => import('./private/ingress/ingress.module').then( m => m.IngressModule )
  },
  {
    path: 'concept',
    loadChildren: () => import('./private/concept/concept.module').then( m => m.ConceptModule )
  },
  {
    path: 'currency',
    loadChildren: () => import('./private/currency/currency.module').then( m => m.CurrencyModule )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
