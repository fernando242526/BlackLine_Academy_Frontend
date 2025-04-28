import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  
  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  
  canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  
  private checkAuth(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    this.toastService.warning('Sesión no iniciada', 'Debes iniciar sesión para acceder a esta sección');
    return this.router.createUrlTree(['/auth/login']);
  }
}