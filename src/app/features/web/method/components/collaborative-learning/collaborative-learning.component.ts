import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faUsers,
  faUserGroup,
  faComments,
  faCode,
  faLaptopCode,
  faNetworkWired,
  faCloudUploadAlt,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';

interface CollaborationFeature {
  title: string;
  description: string;
  icon: IconDefinition;
}

interface CommunityElement {
  name: string;
  description: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-collaborative-learning',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './collaborative-learning.component.html',
  styleUrls: ['./collaborative-learning.component.scss']
})
export class CollaborativeLearningComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'cyber-cyan';
  
  // Características del aprendizaje colaborativo
  collaborationFeatures: CollaborationFeature[] = [
    {
      title: 'Pair Programming',
      description: 'Trabajo en parejas donde dos agentes resuelven problemas de manera sincronizada, alternando roles de conductor y revisor.',
      icon: faUserGroup
    },
    {
      title: 'Code Reviews',
      description: 'Sesiones de revisión de código donde los estudiantes analizan y mejoran mutuamente sus soluciones técnicas.',
      icon: faCode
    },
    {
      title: 'Proyectos de Equipo',
      description: 'Desafíos complejos que requieren la colaboración de múltiples agentes con habilidades complementarias.',
      icon: faProjectDiagram
    },
    {
      title: 'Foros Técnicos',
      description: 'Espacios de discusión asíncrona donde se comparten soluciones, preguntas y conocimientos especializados.',
      icon: faComments
    }
  ];
  
  // Elementos de la comunidad
  communityElements: CommunityElement[] = [
    {
      name: 'Hackathons',
      description: 'Eventos intensivos donde equipos colaboran para crear soluciones en tiempo limitado.',
      icon: faLaptopCode
    },
    {
      name: 'Repositorios Compartidos',
      description: 'Bibliotecas de código y recursos mantenidos por la comunidad.',
      icon: faCloudUploadAlt
    },
    {
      name: 'Red de Mentorías',
      description: 'Sistema donde estudiantes avanzados guían a los novatos.',
      icon: faNetworkWired
    }
  ];
  
  // Estadísticas de impacto
  impactStats = [
    { value: '87%', label: 'Mayor retención de conocimiento' },
    { value: '72%', label: 'Incremento en resolución de problemas' },
    { value: '94%', label: 'Satisfacción con el aprendizaje' }
  ];
}