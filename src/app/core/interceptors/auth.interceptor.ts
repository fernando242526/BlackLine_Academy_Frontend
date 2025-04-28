import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del localStorage
    const token = localStorage.getItem('bl_access_token');
    
    // Agregar el token a la cabecera si existe
    if (token) {
      request = this.addToken(request, token);
    }
    
    // Enviar la petición y manejar errores
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        
        return throwError(() => error);
      })
    );
  }
  
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      
      // Intentar refrescar el token
      return this.authService.refreshToken().pipe(
        switchMap(response => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.accessToken);
          
          // Reenviar la petición original con el nuevo token
          return next.handle(this.addToken(request, response.accessToken));
        }),
        catchError(error => {
          this.isRefreshing = false;
          
          // Si no se puede refrescar el token, desloguear y redireccionar al login
          this.authService.logout();
          
          return throwError(() => error);
        })
      );
    } else {
      // Si ya se está refrescando, esperar hasta que termine y reenviar con el nuevo token
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, token)))
      );
    }
  }
}