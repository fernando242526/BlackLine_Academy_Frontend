import { Component, signal, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faPaperPlane,
  faCircleNotch,
  faExclamationCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ContactMapComponent } from './components/contact-map/contact-map.component';
import { ContactHeaderComponent } from './components/contact-header/contact-header.component';
import { ParticleBackgroundComponent } from '../../../shared/components/particle-background/particle-background.component';

/**
 * Componente principal para la página de contacto
 * Coordina los diferentes componentes de contacto y maneja la lógica general
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ContactFormComponent,
    ContactInfoComponent,
    ContactMapComponent,
    ContactHeaderComponent,
    ParticleBackgroundComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export default class ContactComponent {
  // Iconos
  protected faEnvelope = faEnvelope;
  protected faPhone = faPhone;
  protected faLocationDot = faLocationDot;
  protected faPaperPlane = faPaperPlane;
  protected faCircleNotch = faCircleNotch;
  protected faExclamationCircle = faExclamationCircle;
  protected faCheckCircle = faCheckCircle;
  
  // Información de contacto
  protected contactInfo = [
    {
      icon: faEnvelope,
      title: 'Correo Electrónico',
      details: ['info@blacklineacademy.com', 'soporte@blacklineacademy.com'],
      color: 'cyber-cyan'
    },
    {
      icon: faPhone,
      title: 'Teléfono',
      details: ['+52 55 1234 5678', '+52 55 8765 4321'],
      color: 'neon-violet'
    },
    {
      icon: faLocationDot,
      title: 'Ubicación',
      details: ['Calle Tecnología #404', 'Col. Digital, CP 01010', 'Ciudad de México, México'],
      color: 'glitch-green'
    }
  ];
  
  // Signal para el estado del formulario
  protected formSubmitState = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Estado computado para mensajes
  protected formStateMessage = computed(() => {
    switch (this.formSubmitState()) {
      case 'submitting':
        return 'Enviando mensaje...';
      case 'success':
        return 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.';
      case 'error':
        return 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
      default:
        return '';
    }
  });
  
  /**
   * Maneja la acción de envío del formulario
   * @param formData Datos del formulario
   */
  protected handleFormSubmit(formData: any): void {
    // Cambia el estado a enviando
    this.formSubmitState.set('submitting');
    
    // Simula una petición a un servicio
    setTimeout(() => {
      // Aquí iría la lógica real para enviar el formulario
      console.log('Formulario enviado:', formData);
      
      // Cambia el estado a éxito (o error en caso de fallo)
      this.formSubmitState.set('success');
      
      // Restablece el estado después de un tiempo
      setTimeout(() => {
        this.formSubmitState.set('idle');
      }, 5000);
    }, 2000);
  }
}