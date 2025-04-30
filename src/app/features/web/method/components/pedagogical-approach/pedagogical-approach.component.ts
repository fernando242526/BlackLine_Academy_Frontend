import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faCheck,
  faLayerGroup,
  faGears,
  faCode
} from '@fortawesome/free-solid-svg-icons';

interface Principle {
  title: string;
  description: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-pedagogical-approach',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './pedagogical-approach.component.html',
  styleUrls: ['./pedagogical-approach.component.scss']
})
export class PedagogicalApproachComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'cyber-cyan';
  
  // Iconos
  protected faCheck = faCheck;
  
  // Principios pedagógicos
  principles: Principle[] = [
    {
      title: 'Aprendizaje Basado en Proyectos',
      description: 'Teoría aplicada directamente en proyectos reales que simulan desafíos de la industria.',
      icon: faCode
    },
    {
      title: 'Metodología Holística',
      description: 'Desarrollo integral de habilidades técnicas, analíticas y de resolución de problemas.',
      icon: faLayerGroup
    },
    {
      title: 'Ingeniería Inversa',
      description: 'Descomponer sistemas complejos para entender sus componentes y funcionamiento.',
      icon: faGears
    }
  ];
  
  // Elementos clave del enfoque pedagógico
  keyFeatures: string[] = [
    'Enfoque práctico-experimental',
    'Conexión directa teoría-práctica',
    'Aprendizaje activo y reflexivo',
    'Desarrollo de pensamiento crítico',
    'Inmersión en entornos reales simulados',
    'Retroalimentación continua',
    'Aprendizaje constructivista'
  ];
}