import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faSpinner, 
  faSignInAlt 
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoginDto } from '../../../core/models/auth.model';
import { ParticleBackgroundComponent } from '../../../shared/components/particle-background/particle-background.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ParticleBackgroundComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  // Servicios
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  
  // Iconos
  protected faEnvelope = faEnvelope;
  protected faLock = faLock;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faSpinner = faSpinner;
  protected faSignIn = faSignInAlt;
  
  // Variables reactivas
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  
  // Getters para acceder fácilmente a los campos del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  ngOnInit(): void {
    this.initForm();
  }
  
  // Inicializar formulario con validaciones
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });
  }
  
  // Mostrar/ocultar contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  // Enviar formulario
  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }
    
    this.isLoading = true;
    
    const loginData: LoginDto = {
      email: this.email?.value,
      password: this.password?.value
    };
    
    // En producción, esto llamaría al servicio real
    // Por ahora, simulamos un login exitoso
    setTimeout(() => {
      this.isLoading = false;
      
      // Simulación de login exitoso con un toast
      this.toastService.success(
        'Inicio de sesión exitoso',
        'Bienvenido a BlackLine Academy'
      );
      
      // Redirigir a la página principal
      // En un caso real, el AuthService se encargaría de la redirección según el rol
      this.authService.login(loginData).subscribe({
        error: (error) => {
          this.isLoading = false;
          this.toastService.error(
            'Error de inicio de sesión',
            error.message || 'Verifica tus credenciales e intenta nuevamente'
          );
        }
      });
    }, 1500);
  }
}