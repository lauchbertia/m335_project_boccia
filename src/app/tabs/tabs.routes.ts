import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        children: [
          {
            path: 'item',
            loadComponent: () =>
              import('../item-detail/item-detail.component').then((m) => m.ItemDetail),
          },
          {
            path: 'items',
            loadComponent: () =>
            import('../item-detail/item-detail.component').then((m) => m.ItemDetail),
          },
          {
            path: 'item/:id',
            loadComponent: () =>
            import('../item-detail/item-detail.component').then((m) => m.ItemDetail),
          },
          {
            path: 'item',
            redirectTo: 'tab3',
            pathMatch: 'full',
          }
        ],
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: 'tab5',
        children: [
          {
            path: 'lists',
            loadComponent: () =>
              import('../shopping-list/shopping-list.component').then((m) => m.ShoppingListComponent),
          },
          {
            path: 'item',
            loadComponent: () =>
            import('../item-detail/item-detail.component').then((m) => m.ItemDetail),
          },
          {
            path: 'item/:id',
            loadComponent: () =>
            import('../item-detail/item-detail.component').then((m) => m.ItemDetail),
          },
          {
            path: 'item',
            redirectTo: 'lists',
            pathMatch: 'full',
          }
        ],
        loadComponent: () =>
          import('../tab5/tab5.page').then((m) => m.Tab5Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
