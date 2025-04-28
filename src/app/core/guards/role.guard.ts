import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanMatch, Router, UrlTree, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanMatch {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);
  }
  
  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);
  }
  
  canMatch(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route.data?.['role']);
  }
  
  private checkRole(route: ActivatedRouteSnapshot): boolean | UrlTree {
    // Obtener el rol requerido desde la ruta
    const requiredRole = route.data['role'] as string | string[];
    
    // Verificar que el usuario esté autenticado
    if (!this.authService.isAuthenticated()) {
      this.toastService.warning('Sesión no iniciada', 'Debes iniciar sesión para acceder a esta sección');
      return this.router.createUrlTree(['/auth/login']);
    }
    
    // Si es array de roles, comprobar si tiene al menos uno
    if (Array.isArray(requiredRole)) {
      const hasAnyRole = requiredRole.some(role => this.authService.hasRole(role));
      
      if (hasAnyRole) {
        return true;
      }
    } else if (requiredRole && this.authService.hasRole(requiredRole)) {
      // Si es un solo rol, comprobar si lo tiene
      return true;
    }
    
    // Si no tiene el rol requerido
    this.toastService.error('Acceso denegado', 'No tienes permisos para acceder a esta sección');
    
    // Redireccionar según el rol actual del usuario
    if (this.authService.isAdmin()) {
      return this.router.createUrlTree(['/admin']);
    } else if (this.authService.isTeacher()) {
      return this.router.createUrlTree(['/teacher']);
    } else if (this.authService.isStudent()) {
      return this.router.createUrlTree(['/student']);
    } else {
      return this.router.createUrlTree(['/web']);
    }
  }
}