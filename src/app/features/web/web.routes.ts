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
      },
      {
        path: 'cursos',
        loadComponent: () => import('./courses/courses.component'),
      },
      {
        path: 'cursos/:id',
        loadComponent: () => import('./course/course.component'),
      },
      {
        path: 'metodos-enseñanza',
        loadComponent: () => import('./method/method.component'),
      },
      {
        path: 'contactanos',
        loadComponent: () => import('./contact/contact.component'),
      },
      {
        path: 'certificaciones',
        loadComponent: () => import('./certifications/certifications.component'),
      }
    ],
  },
];

export default WEB_ROUTES;