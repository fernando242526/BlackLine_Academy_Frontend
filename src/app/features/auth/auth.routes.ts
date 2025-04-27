import { Routes } from '@angular/router';

const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      
    ],
  },
];

export default AUTH_ROUTES;
