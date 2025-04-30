import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faProjectDiagram,
  faBolt,
  faCode,
  faUserGroup,
  faLaptopCode,
  faChartLine,
  faGamepad
} from '@fortawesome/free-solid-svg-icons';

interface Strategy {
  title: string;
  description: string;
  icon: IconDefinition;
  benefits: string[];
}

@Component({
  selector: 'app-teaching-strategies',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './teaching-strategies.component.html',
  styleUrls: ['./teaching-strategies.component.scss']
})
export class TeachingStrategiesComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'glitch-green';
  
  // Estrategias didácticas principales
  strategies: Strategy[] = [
    {
      title: 'Desafíos Prácticos',
      description: 'Aplicación de conocimientos en escenarios profesionales reales con deadlines y requisitos precisos.',
      icon: faProjectDiagram,
      benefits: [
        'Desarrollo de pensamiento crítico',
        'Aplicación práctica inmediata',
        'Simulación de entorno laboral real'
      ]
    },
    {
      title: 'Hackathons Educativos',
      description: 'Sesiones intensivas de resolución de problemas para crear soluciones funcionales en tiempo limitado.',
      icon: faBolt,
      benefits: [
        'Trabajo bajo presión',
        'Desarrollo de velocidad de implementación',
        'Fomento de creatividad e innovación'
      ]
    },
    {
      title: 'Reverse Engineering',
      description: 'Desglose y análisis de proyectos existentes para comprender patrones de diseño y técnicas avanzadas.',
      icon: faCode,
      benefits: [
        'Comprensión profunda de sistemas',
        'Aprendizaje de mejores prácticas',
        'Desarrollo de capacidad analítica'
      ]
    },
    {
      title: 'Pair Programming',
      description: 'Colaboración sincronizada entre dos estudiantes para resolver problemas complejos, alternando roles.',
      icon: faUserGroup,
      benefits: [
        'Mejora de habilidades colaborativas',
        'Revisión continua de código',
        'Transferencia de conocimiento entre pares'
      ]
    }
  ];

  // Estrategias complementarias
  complementaryStrategies = [
    {
      title: 'Simuladores de Entorno Real',
      icon: faLaptopCode
    },
    {
      title: 'Análisis de Casos de Estudio',
      icon: faChartLine
    },
    {
      title: 'Gamificación Avanzada',
      icon: faGamepad
    }
  ];
}