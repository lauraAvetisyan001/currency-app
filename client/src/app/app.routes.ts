import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/currency/currency.module').then((m) => m.CurrencyModule),
  },
];
