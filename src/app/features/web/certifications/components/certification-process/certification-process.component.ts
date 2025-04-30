import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBookOpen,
  faCode,
  faClipboardCheck,
  faAward,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

/**
 * Interfaz para los pasos del proceso de certificación
 */
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
}

/**
 * Componente para mostrar el proceso de certificación
 */
@Component({
  selector: 'app-certification-process',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './certification-process.component.html',
  styleUrls: ['./certification-process.component.scss']
})
export class CertificationProcessComponent {
  // Iconos
  protected faBookOpen = faBookOpen;
  protected faCode = faCode;
  protected faClipboardCheck = faClipboardCheck;
  protected faAward = faAward;
  protected faChevronRight = faChevronRight;
  
  // Pasos del proceso
  protected steps: ProcessStep[] = [
    {
      id: 1,
      title: 'Preparación',
      description: 'Accede a nuestro material de estudio especializado y prepárate a tu ritmo con contenido multimedia, ejercicios prácticos y simulaciones.',
      icon: faBookOpen,
      color: 'cyber-cyan'
    },
    {
      id: 2,
      title: 'Práctica',
      description: 'Aplica tus conocimientos en laboratorios virtuales y proyectos prácticos que simulan escenarios reales de la industria.',
      icon: faCode,
      color: 'neon-violet'
    },
    {
      id: 3,
      title: 'Evaluación',
      description: 'Demuestra tu dominio mediante exámenes teórico-prácticos que evalúan tanto tu conocimiento como tu capacidad de aplicarlo.',
      icon: faClipboardCheck,
      color: 'glitch-green'
    },
    {
      id: 4,
      title: 'Certificación',
      description: 'Recibe tu certificado digital verificable en blockchain, que valida tus habilidades y conocimientos ante empleadores.',
      icon: faAward,
      color: 'prisma-amber'
    }
  ];
}