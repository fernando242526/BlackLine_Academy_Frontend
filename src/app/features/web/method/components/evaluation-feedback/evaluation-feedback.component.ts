import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine,
  faEye,
  faCodeBranch,
  faRobot,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faQuestionCircle,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

interface EvaluationMethod {
  name: string;
  description: string;
  icon: IconDefinition;
  label: string;
}

interface FeedbackType {
  name: string;
  description: string;
  icon: IconDefinition;
  bgColor: string;
}

@Component({
  selector: 'app-evaluation-feedback',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './evaluation-feedback.component.html',
  styleUrls: ['./evaluation-feedback.component.scss']
})
export class EvaluationFeedbackComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'prisma-amber';
  
  // Métodos de evaluación
  evaluationMethods: EvaluationMethod[] = [
    {
      name: 'Análisis de Código en Tiempo Real',
      description: 'Evaluación continua del código escrito por el estudiante mediante análisis estático y dinámico.',
      icon: faCodeBranch,
      label: 'Técnico'
    },
    {
      name: 'Revisión por Pares',
      description: 'Evaluación cruzada entre estudiantes para fomentar la capacidad crítica y el aprendizaje colaborativo.',
      icon: faUsers,
      label: 'Social'
    },
    {
      name: 'Evaluación basada en Proyectos',
      description: 'Valoración holística de proyectos completos que simulan desafíos del mundo real.',
      icon: faEye,
      label: 'Práctico'
    },
    {
      name: 'Evaluación Automatizada con IA',
      description: 'Sistemas de inteligencia artificial que evalúan objetivamente el desempeño y proporcionan feedback detallado.',
      icon: faRobot,
      label: 'Avanzado'
    }
  ];
  
  // Tipos de retroalimentación
  feedbackTypes: FeedbackType[] = [
    {
      name: 'Feedback Correctivo',
      description: 'Identifica errores específicos o áreas de mejora que requieren atención inmediata.',
      icon: faExclamationTriangle,
      bgColor: 'critical-red'
    },
    {
      name: 'Feedback Confirmatorio',
      description: 'Refuerza los aciertos y comportamientos positivos para reforzar el aprendizaje correcto.',
      icon: faCheckCircle,
      bgColor: 'glitch-green'
    },
    {
      name: 'Feedback Interrogativo',
      description: 'Plantea preguntas estratégicas que guían al estudiante hacia sus propias conclusiones.',
      icon: faQuestionCircle,
      bgColor: 'electric-blue'
    },
    {
      name: 'Feedback Constructivo',
      description: 'Ofrece alternativas y sugerencias para mejorar el rendimiento y expandir perspectivas.',
      icon: faLightbulb,
      bgColor: 'cyber-cyan'
    }
  ];
}