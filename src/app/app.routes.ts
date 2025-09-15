import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
}, {
    path: 'menu',
    pathMatch: 'full',
    loadComponent: () => import('./components/menu/menu.component').then(m => m.MenuComponent)
}, {
    path: 'OnlineOrders',
    pathMatch: 'full',
    loadComponent: () => import('./components/online-orders/online-orders.component').then(m => m.OnlineOrdersComponent)
}];
