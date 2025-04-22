import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent:() => import('./components/cart/cart.component').then(m => m.CartComponent ),
  }
];
