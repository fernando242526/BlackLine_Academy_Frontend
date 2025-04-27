import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes')
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes')
    },
    {
        path: 'teacher',
        loadChildren: () => import('./features/teacher/teacher.routes')
    },
    {
        path: 'student',
        loadChildren: () => import('./features/student/student.routes')
    },
    {
        path: 'web',
        loadChildren: () => import('./features/web/web.routes')
    },
];