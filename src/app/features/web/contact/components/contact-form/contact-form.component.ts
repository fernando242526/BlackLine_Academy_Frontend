import { Component, Output, EventEmitter, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faEnvelope, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente para el formulario de contacto
 * Gestiona la entrada de datos y validación del formulario
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  
  @Input() submitState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  @Output() formSubmit = new EventEmitter<any>();
  
  // Iconos para el formulario
  protected faUser = faUser;
  protected faEnvelope = faEnvelope;
  protected faComments = faComments;
  protected faPaperPlane = faPaperPlane;
  
  // Señales para el estado del formulario
  protected formTouched = signal<boolean>(false);
  
  // Formulario reactivo
  protected contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });
  
  // Valores computados para validación
  protected formIsValid = computed(() => this.contactForm.valid);
  protected canSubmit = computed(() => this.formIsValid() && this.submitState === 'idle');
  
  /**
   * Envía el formulario si es válido
   */
  protected onSubmit(): void {
    // Marcar el formulario como tocado para activar las validaciones visuales
    this.formTouched.set(true);
    this.markFormGroupTouched(this.contactForm);
    
    // Solo emitir si el formulario es válido y podemos enviar
    if (this.canSubmit()) {
      this.formSubmit.emit(this.contactForm.value);
    }
  }
  
  /**
   * Marca todos los controles del formulario como tocados
   * para mostrar los errores de validación
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  /**
   * Verifica si un campo tiene errores y ha sido tocado
   * @param controlName Nombre del control a verificar
   */
  protected hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched || this.formTouched());
  }
  
  /**
   * Verifica si un campo ha sido validado correctamente
   * @param controlName Nombre del control a verificar
   */
  protected isValid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.valid && (control.dirty || control.touched || this.formTouched());
  }
  
  /**
   * Obtiene el mensaje de error para un campo específico
   * @param controlName Nombre del control
   */
  protected getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }
    
    if (control.errors['email']) {
      return 'Ingresa un correo electrónico válido';
    }
    
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Este campo debe tener al menos ${requiredLength} caracteres`;
    }
    
    return 'Este campo tiene un error';
  }
}