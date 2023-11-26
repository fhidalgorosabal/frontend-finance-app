import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./public/auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'home',
    loadChildren: () => import('./private/home/home.module').then( m => m.HomeModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    loadChildren: () => import('./private/setting/setting.module').then( m => m.SettingModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'expense',
    loadChildren: () => import('./private/expense/expense.module').then( m => m.ExpenseModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'ingress',
    loadChildren: () => import('./private/ingress/ingress.module').then( m => m.IngressModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'concept',
    loadChildren: () => import('./private/concept/concept.module').then( m => m.ConceptModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'currency',
    loadChildren: () => import('./private/currency/currency.module').then( m => m.CurrencyModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./private/account/account.module').then( m => m.AccountModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'bank',
    loadChildren: () => import('./private/bank/bank.module').then( m => m.BankModule )
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
