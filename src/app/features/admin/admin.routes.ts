import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'categorias',
        loadComponent: () => import('./categoria/lista-categorias/lista-categorias.component'),
      },
      {
        path: 'categorias/nueva',
        loadComponent: () => import('./categoria/components/form-categoria/form-categoria.component'),
      },
      {
        path: 'categorias/editar/:id',
        loadComponent: () => import('./categoria/components/form-categoria/form-categoria.component'),
      },
      {
        path: 'subcategorias',
        loadComponent: () => import('./subcategoria/lista-subcategorias/lista-subcategorias.component'),
      }
    ],
  },
];

export default ADMIN_ROUTES;