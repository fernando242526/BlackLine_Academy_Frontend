import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faRocket,
  faLightbulb,
  faFlask,
  faTools,
  faVrCardboard,
  faAtom,
  faRobot,
  faPlug,
  faSync,
  faSearch,
  faBrain
} from '@fortawesome/free-solid-svg-icons';

interface InnovationPrinciple {
  title: string;
  description: string;
  icon: IconDefinition;
}

interface TechnologyTrend {
  name: string;
  description: string;
  icon: IconDefinition;
  readiness: number; // 1-5 scale
}

@Component({
  selector: 'app-innovation',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './innovation.component.html',
  styleUrls: ['./innovation.component.scss']
})
export class InnovationComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'critical-red';

  faRocket = faRocket;
  
  // Principios de innovación en aprendizaje
  innovationPrinciples: InnovationPrinciple[] = [
    {
      title: 'Ciclos de Experimentación Rápida',
      description: 'Implementación de métodos ágiles para probar y refinar continuamente nuevas técnicas pedagógicas y tecnológicas.',
      icon: faSync
    },
    {
      title: 'Retroalimentación Continua',
      description: 'Sistemas de feedback en tiempo real que permiten ajustar y mejorar la experiencia educativa de manera inmediata.',
      icon: faSearch
    },
    {
      title: 'Vigilancia Tecnológica',
      description: 'Seguimiento constante de avances tecnológicos para incorporar innovaciones que mejoren el aprendizaje.',
      icon: faLightbulb
    },
    {
      title: 'Investigación Aplicada',
      description: 'Colaboración con investigadores y expertos para incorporar nuevos descubrimientos en ciencias del aprendizaje.',
      icon: faFlask
    }
  ];
  
  // Tecnologías emergentes en aprendizaje
  emergingTechnologies: TechnologyTrend[] = [
    {
      name: 'Interfaces Neurales',
      description: 'Tecnologías que interpretan la actividad cerebral para adaptar el aprendizaje y medir la comprensión real.',
      icon: faBrain,
      readiness: 2
    },
    {
      name: 'Metaverso Educativo',
      description: 'Entornos 3D inmersivos que permiten experiencias colaborativas en espacios virtuales compartidos.',
      icon: faVrCardboard,
      readiness: 3
    },
    {
      name: 'AI Generativa para Educación',
      description: 'Sistemas que crean contenido educativo personalizado y adaptativo en tiempo real.',
      icon: faRobot,
      readiness: 4
    },
    {
      name: 'Aprendizaje Cuántico',
      description: 'Aplicación de conceptos de computación cuántica para modelar procesos cognitivos complejos.',
      icon: faAtom,
      readiness: 1
    }
  ];
  
  // Herramientas de mejora continua
  improvementTools = [
    { name: 'Analytics Avanzados', icon: faSearch },
    { name: 'Labs de Innovación', icon: faFlask },
    { name: 'Feedback Loops', icon: faSync },
    { name: 'Tech Integration', icon: faPlug }
  ];
  
  // Método para obtener array para mostrar estrellas de readiness
  getReadinessArray(readiness: number): number[] {
    return Array(readiness).fill(0);
  }
  
  // Método para obtener array para mostrar estrellas vacías
  getEmptyReadinessArray(readiness: number): number[] {
    return Array(5 - readiness).fill(0);
  }
}