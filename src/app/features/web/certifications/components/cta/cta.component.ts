import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faRocket, 
  faCalendarAlt, 
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cta',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  // Iconos
  protected faRocket = faRocket;
  protected faCalendarAlt = faCalendarAlt;
  protected faCertificate = faCertificate;
  
  // Info de próximas sesiones
  upcomingSessions = [
    { name: 'Desarrollo Avanzado', date: '15 de Junio, 2025', status: 'Plazas disponibles' },
    { name: 'Ciberseguridad Ofensiva', date: '22 de Junio, 2025', status: 'Últimas plazas' },
    { name: 'Ingeniería de Datos', date: '1 de Julio, 2025', status: 'Abierta inscripción' }
  ];
}
