import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faUser, 
  faPhone,
  faEye, 
  faEyeSlash, 
  faUserPlus,
  faSyncAlt,
  faExclamationTriangle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { RegisterDto } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  
  // Iconos
  protected faEnvelope = faEnvelope;
  protected faLock = faLock;
  protected faUser = faUser;
  protected faPhone = faPhone;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faUserPlus = faUserPlus;
  protected faSyncAlt = faSyncAlt;
  protected faExclamationTriangle = faExclamationTriangle;
  protected faArrowLeft = faArrowLeft;
  
  // Estado de visibilidad de contraseña
  showPassword = false;
  
  // Estado de carga
  isLoading = false;
  
  // Formulario reactivo
  registerForm!: FormGroup;
  
  ngOnInit(): void {
    // Redirigir si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.navigateByRole();
      return;
    }
    
    // Inicializar formulario
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^\+?[0-9]{8,15}$/)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(50),
        this.passwordStrengthValidator
      ]]
    });
  }
  
  /**
   * Validador personalizado para fortaleza de contraseña
   */
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    
    if (!value) {
      return null;
    }
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    const passwordValid = hasUpperCase && hasLowerCase && (hasNumeric || hasSpecialChar);
    
    return !passwordValid ? { passwordStrength: true } : null;
  }
  
  /**
   * Manejar envío del formulario
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }
    
    this.isLoading = true;
    
    const registerData: RegisterDto = this.registerForm.value;
    
    this.authService.register(registerData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toastService.success('¡Registro exitoso!', 'Bienvenido a BlackLine Academy');
          // La redirección la maneja el servicio de auth
        },
        error: (error) => {
          // El error ya es manejado por el servicio
          console.error('Register error:', error);
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