import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faSignInAlt,
  faSyncAlt,
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  
  // Iconos de FontAwesome
  protected faEnvelope = faEnvelope;
  protected faLock = faLock;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faSignInAlt = faSignInAlt;
  protected faSyncAlt = faSyncAlt;
  protected faExclamationTriangle = faExclamationTriangle;
  
  // Estado de visibilidad de contraseña
  showPassword = false;
  
  // Estado de carga
  isLoading = false;
  
  // Formulario reactivo
  loginForm!: FormGroup;
  
  ngOnInit(): void {
    // Redireccionar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.navigateByRole();
      return;
    }
    
    // Inicializar formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  /**
   * Manejar envío del formulario
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }
    
    this.isLoading = true;
    
    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toastService.success('¡Bienvenido!', 'Inicio de sesión exitoso');
          // La redirección la maneja el servicio de auth
        },
        error: (error) => {
          // El error ya es manejado por el servicio
          console.error('Login error:', error);
        }
      });
  }
  
  /**
   * Alternar visibilidad de contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  /**
   * Navegar según el rol del usuario
   */
  private navigateByRole(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
    } else if (this.authService.isTeacher()) {
      this.router.navigate(['/teacher']);
    } else if (this.authService.isStudent()) {
      this.router.navigate(['/student']);
    } else {
      this.router.navigate(['/web']);
    }
  }
  
  /**
   * Marcar todos los campos del formulario como tocados
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}