import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faPaperPlane, 
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export default class ContactComponent implements OnInit {
  // Iconos
  protected faMapMarker = faMapMarkerAlt;
  protected faEnvelope = faEnvelope;
  protected faPhone = faPhone;
  protected faPaperPlane = faPaperPlane;
  protected faSpinner = faSpinner;
  protected faCheckCircle = faCheckCircle;
  protected faExclamationTriangle = faExclamationTriangle;
  protected faTwitter = faTwitter;
  protected faLinkedin = faLinkedin;
  protected faGithub = faGithub;
  protected faDiscord = faDiscord;
  protected faChevronDown = faChevronDown;
  
  // Formulario
  contactForm!: FormGroup;
  
  // Estado del formulario
  isSubmitting = false;
  isSuccess = false;
  
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}
  
  ngOnInit() {
    this.initForm();
  }
  
  /**
   * Inicializa el formulario con validaciones
   */
  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]]
    });
  }
  
  /**
   * Maneja el envío del formulario
   */
  onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      this.toastService.error('Por favor, corrige los errores en el formulario');
      return;
    }
    
    this.isSubmitting = true;
    
    // Simulación de envío (reemplazar con llamada real a API)
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSuccess = true;
      this.toastService.success('Mensaje enviado correctamente', 'Te responderemos a la brevedad');
      
      // Resetear formulario después de un tiempo
      setTimeout(() => {
        this.contactForm.reset();
        this.isSuccess = false;
      }, 3000);
    }, 1500);
  }
  
  /**
   * Verifica si un campo específico tiene errores y ha sido tocado
   */
  hasError(field: string): boolean {
    const control = this.contactForm.get(field);
    return (control?.invalid && (control?.touched || control?.dirty)) ?? false;
  }
  
  /**
   * Obtiene el mensaje de error para un campo específico
   */
  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    
    if (!control) return '';
    
    if (control.errors?.['required']) {
      return 'Este campo es requerido';
    }
    
    if (control.errors?.['email']) {
      return 'Debe ingresar un email válido';
    }
    
    if (control.errors?.['minlength']) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Debe contener al menos ${minLength} caracteres`;
    }
    
    if (control.errors?.['maxlength']) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `No debe exceder los ${maxLength} caracteres`;
    }
    
    return '';
  }
  
  /**
   * Marca todos los campos del formulario como tocados
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
  }
}