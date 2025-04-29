import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser,
  faEnvelope, 
  faPhone,
  faLock, 
  faEye, 
  faEyeSlash, 
  faSpinner, 
  faUserPlus,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { RegisterDto } from '../../../core/models/auth.model';
import { ParticleBackgroundComponent } from '../../../shared/components/particle-background/particle-background.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ParticleBackgroundComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit, OnDestroy {
  // Servicios
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  
  // Iconos
  protected faUser = faUser;
  protected faEnvelope = faEnvelope;
  protected faPhone = faPhone;
  protected faLock = faLock;
  protected faEye = faEye;
  protected faEyeSlash = faEyeSlash;
  protected faSpinner = faSpinner;
  protected faUserPlus = faUserPlus;
  protected faCheckCircle = faCheckCircle;
  protected faTimesCircle = faTimesCircle;
  
  // Variables reactivas
  registerForm!: FormGroup;
  isLoading = false;
  showPassword = false;
  
  // Subscripciones
  private subscriptions: Subscription[] = [];
  
  // Validadores de contraseña
  passwordLength = false;
  passwordUppercase = false;
  passwordLowercase = false;
  passwordNumber = false;
  passwordSpecial = false;
  passwordsMatch = false;
  
  // Getters para acceder fácilmente a los campos del formulario
  get nombre() { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get email() { return this.registerForm.get('email'); }
  get telefono() { return this.registerForm.get('telefono'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }
  get terms() { return this.registerForm.get('terms'); }
  
  ngOnInit(): void {
    this.initForm();
    this.setupPasswordValidators();
  }
  
  ngOnDestroy(): void {
    // Limpiamos suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  // Inicializar formulario con validaciones
  private initForm(): void {
    // Expresión regular para validar contraseña segura:
    // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    // Expresión regular para validar formato de teléfono internacional
    const phonePattern = /^\+?[0-9\s()-]{8,}$/;
    
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(phonePattern)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(passwordPattern)
      ]],
      passwordConfirm: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }
  
  // Validador personalizado para verificar que las contraseñas coinciden
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirm')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
  // Suscribirse a cambios en los campos de contraseña para actualizar validadores en tiempo real
  private setupPasswordValidators(): void {
    // Suscripción para verificar requisitos de contraseña
    const passwordSub = this.password?.valueChanges.subscribe(value => {
      this.updatePasswordValidators(value);
    });
    
    if (passwordSub) {
      this.subscriptions.push(passwordSub);
    }
    
    // Suscripción para verificar coincidencia de contraseñas
    const passwordConfirmSub = this.passwordConfirm?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
    
    if (passwordConfirmSub) {
      this.subscriptions.push(passwordConfirmSub);
    }
  }
  
  // Actualizar el estado de los validadores de contraseña
  private updatePasswordValidators(password: string): void {
    // Actualizamos cada criterio individualmente
    this.passwordLength = typeof password === 'string' && password.length >= 8;
    this.passwordUppercase = /[A-Z]/.test(password);
    this.passwordLowercase = /[a-z]/.test(password);
    this.passwordNumber = /[0-9]/.test(password);
    this.passwordSpecial = /[@$!%*?&]/.test(password);
    
    // También verificamos si coinciden las contraseñas
    this.checkPasswordsMatch();
  }
  
  // Verificar si las contraseñas coinciden
  private checkPasswordsMatch(): void {
    const password = this.password?.value;
    const confirmPassword = this.passwordConfirm?.value;
    
    this.passwordsMatch = Boolean(
      password && 
      confirmPassword && 
      password === confirmPassword
    );
  }
  
  // Mostrar/ocultar contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  // Enviar formulario
  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.isLoading = true;
    
    const registerData: RegisterDto = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      email: this.email?.value,
      password: this.password?.value,
      telefono: this.telefono?.value
    };
    
    // En producción, esto llamaría al servicio real
    // Por ahora, simulamos un registro exitoso
    setTimeout(() => {
      this.isLoading = false;
      
      // Simulación de registro exitoso con un toast
      this.toastService.success(
        'Registro exitoso',
        'Bienvenido a BlackLine Academy. Ahora puedes iniciar sesión.'
      );
      
      // En un caso real, se llamaría al servicio de autenticación
      this.authService.register(registerData).subscribe({
        error: (error) => {
          this.isLoading = false;
          this.toastService.error(
            'Error de registro',
            error.message || 'Ocurrió un error al crear tu cuenta. Inténtalo nuevamente.'
          );
        }
      });
    }, 1500);
  }
}