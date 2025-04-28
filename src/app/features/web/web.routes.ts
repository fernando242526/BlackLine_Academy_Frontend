import { Routes } from '@angular/router';
import WebComponent from './web.component';

const WEB_ROUTES: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.component'),
      },
      {
        path: 'nosotros',
        loadComponent: () => import('./about/about.component'),
      },
      {
        path: 'contactanos',
        loadComponent: () => import('./contact/contact.component'),
      }
    ],
  },
];

export default WEB_ROUTES;