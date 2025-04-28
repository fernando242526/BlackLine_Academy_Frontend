import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import { AuthResponseDto, LoginDto, RegisterDto, UsuarioResponseDto } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'bl_access_token';
  private readonly refreshTokenKey = 'bl_refresh_token';
  private readonly userKey = 'bl_user';
  
  // Signals para estado de autenticación
  private authState = signal<{
    isAuthenticated: boolean;
    user: UsuarioResponseDto | null;
    loading: boolean;
    roles: string[];
  }>({
    isAuthenticated: false,
    user: null,
    loading: true,
    roles: []
  });
  
  // Computed signals para acceder al estado
  public isAuthenticated = computed(() => this.authState().isAuthenticated);
  public currentUser = computed(() => this.authState().user);
  public isLoading = computed(() => this.authState().loading);
  public userRoles = computed(() => this.authState().roles);
  
  // Computed para verificar roles específicos
  public isAdmin = computed(() => this.authState().roles.includes('administrador'));
  public isTeacher = computed(() => this.authState().roles.includes('profesor'));
  public isStudent = computed(() => this.authState().roles.includes('estudiante'));

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    this.checkAuthStatus();
  }

  /**
   * Comprobar el estado de autenticación al iniciar
   */
  private checkAuthStatus(): void {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const user = localStorage.getItem(this.userKey);
      
      if (token && user) {
        const userData = JSON.parse(user) as UsuarioResponseDto;
        const roles = userData.roles.map(role => role.nombre);
        
        this.authState.set({
          isAuthenticated: true,
          user: userData,
          loading: false,
          roles: roles
        });
      } else {
        this.authState.set({
          isAuthenticated: false,
          user: null,
          loading: false,
          roles: []
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      this.logout();
    }
  }

  /**
   * Iniciar sesión
   */
  login(loginDto: LoginDto): Observable<AuthResponseDto> {
    this.authState.update(state => ({ ...state, loading: true }));
    
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, loginDto).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Registrar un nuevo usuario
   */
  register(registerDto: RegisterDto): Observable<AuthResponseDto> {
    this.authState.update(state => ({ ...state, loading: true }));
    
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, registerDto).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    const token = localStorage.getItem(this.tokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    
    if (token) {
      // Intenta enviar solicitud de logout al backend
      const logoutData = { accessToken: token };
      if (refreshToken) {
        Object.assign(logoutData, { refreshToken });
      }
      
      this.http.post(`${this.apiUrl}/logout`, logoutData).pipe(
        catchError(() => of(null)) // Ignorar errores en logout
      ).subscribe();
    }
    
    // Limpiar almacenamiento y estado
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    
    this.authState.set({
      isAuthenticated: false,
      user: null,
      loading: false,
      roles: []
    });
    
    this.router.navigate(['/auth/login']);
  }

  /**
   * Refrescar token
   */
  refreshToken(): Observable<AuthResponseDto> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        console.error('Error refreshing token:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    return this.authState().roles.includes(role);
  }

  /**
   * Manejar respuesta exitosa de autenticación
   */
  private handleAuthSuccess(response: AuthResponseDto): void {
    localStorage.setItem(this.tokenKey, response.accessToken);
    localStorage.setItem(this.refreshTokenKey, response.refreshToken);
    localStorage.setItem(this.userKey, JSON.stringify(response.usuario));
    
    const roles = response.usuario.roles.map(role => role.nombre);
    
    this.authState.set({
      isAuthenticated: true,
      user: response.usuario,
      loading: false,
      roles: roles
    });
    
    // Navegar según el rol
    if (roles.includes('administrador')) {
      this.router.navigate(['/admin']);
    } else if (roles.includes('profesor')) {
      this.router.navigate(['/teacher']);
    } else if (roles.includes('estudiante')) {
      this.router.navigate(['/student']);
    } else {
      this.router.navigate(['/web']);
    }
  }

  /**
   * Manejar errores de autenticación
   */
  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    this.authState.update(state => ({ ...state, loading: false }));
    
    let errorMessage = 'Ha ocurrido un error durante la autenticación';
    
    if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    
    this.toastService.error(errorMessage);
    
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Obtener información del usuario actual
   */
  getCurrentUserInfo(): Observable<UsuarioResponseDto> {
    return this.http.get<UsuarioResponseDto>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        const roles = user.roles.map(role => role.nombre);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        
        this.authState.update(state => ({
          ...state,
          user,
          roles
        }));
      }),
      catchError(error => {
        console.error('Error fetching user info:', error);
        return throwError(() => error);
      })
    );
  }
}