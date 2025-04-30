import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCompress,
  faUpload,
  faSync,
  faLevelUp,
  faTerminal,
  faFlask,
  faCode,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';

interface LearningPhase {
  id: number;
  name: string;
  description: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-learning-model',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './learning-model.component.html',
  styleUrls: ['./learning-model.component.scss']
})
export class LearningModelComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'neon-violet';
  
  // Fases del ciclo de aprendizaje
  learningPhases: LearningPhase[] = [
    {
      id: 1,
      name: 'Desciframiento',
      description: 'Análisis profundo de conceptos y deconstrucción de problemas complejos.',
      icon: faCompress
    },
    {
      id: 2,
      name: 'Asimilación',
      description: 'Absorción de conocimientos mediante experimentación y práctica guiada.',
      icon: faUpload
    },
    {
      id: 3,
      name: 'Implementación',
      description: 'Aplicación práctica en proyectos reales y simulaciones de alto nivel.',
      icon: faTerminal
    },
    {
      id: 4,
      name: 'Reinvención',
      description: 'Innovación y adaptación de lo aprendido a nuevos contextos y problemas.',
      icon: faSync
    },
    {
      id: 5,
      name: 'Maestría',
      description: 'Dominio experto y capacidad de enseñar y expandir el conocimiento.',
      icon: faLevelUp
    },
    {
      id: 6,
      name: 'Conexión',
      description: 'Integración de conocimientos multidisciplinarios para generar soluciones interconectadas.',
      icon: faProjectDiagram
    }
  ];
  
  // Características clave del modelo
  modelFeatures = [
    {
      title: 'Experimentación Controlada',
      description: 'Entornos seguros para probar conocimientos sin riesgo real',
      icon: faFlask
    },
    {
      title: 'Desarrollo Iterativo',
      description: 'Ciclos de mejora continua con retroalimentación inmediata',
      icon: faSync
    },
    {
      title: 'Aplicación Constante',
      description: 'Práctica intensiva en proyectos que imitan desafíos reales',
      icon: faCode
    }
  ];
}