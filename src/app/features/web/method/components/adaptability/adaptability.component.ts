import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faUserCog,
  faBrain,
  faChartLine,
  faRobot,
  faFingerprint,
  faSitemap,
  faRoute,
  faLightbulb,
  faChartBar,
  faFlask
} from '@fortawesome/free-solid-svg-icons';

interface AdaptationFeature {
  title: string;
  description: string;
  icon: IconDefinition;
  benefits: string[];
}

@Component({
  selector: 'app-adaptability',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './adaptability.component.html',
  styleUrls: ['./adaptability.component.scss']
})
export class AdaptabilityComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'glitch-purple';
  
  // Características principales de adaptabilidad
  adaptationFeatures: AdaptationFeature[] = [
    {
      title: 'Rutas de Aprendizaje Personalizadas',
      description: 'Trayectorias de contenido que se adaptan a las metas profesionales y conocimientos previos del estudiante.',
      icon: faRoute,
      benefits: [
        'Optimización del tiempo de estudio',
        'Enfoque en habilidades relevantes',
        'Mayor relevancia profesional'
      ]
    },
    {
      title: 'Algoritmos de Adaptación Dinámica',
      description: 'Sistemas de IA que ajustan la dificultad y secuencia del contenido según el rendimiento en tiempo real.',
      icon: faBrain,
      benefits: [
        'Eliminación de gaps de conocimiento',
        'Desafío constante y adecuado',
        'Reducción de la frustración'
      ]
    },
    {
      title: 'Analytics Predictivos',
      description: 'Análisis avanzado de datos que anticipa dificultades y recomienda intervenciones preventivas.',
      icon: faChartLine,
      benefits: [
        'Prevención de abandono',
        'Identificación de patrones problemáticos',
        'Mejora continua del contenido'
      ]
    },
    {
      title: 'Asistentes IA Personalizados',
      description: 'Tutores virtuales que adaptan su comunicación y estrategias a las preferencias individuales.',
      icon: faRobot,
      benefits: [
        'Asistencia 24/7 personalizada',
        'Adaptación al estilo de aprendizaje',
        'Retroalimentación inmediata'
      ]
    }
  ];
  
  // Perfiles de aprendizaje
  learningProfiles = [
    { 
      name: 'Visual', 
      icon: faLightbulb, 
      adaptations: ['Diagramas interactivos', 'Simulaciones gráficas', 'Mapas mentales']
    },
    { 
      name: 'Práctico', 
      icon: faFlask, 
      adaptations: ['Labs prácticos', 'Retos de código', 'Proyectos guiados']
    },
    { 
      name: 'Teórico', 
      icon: faSitemap, 
      adaptations: ['Documentación profunda', 'Papers académicos', 'Análisis de casos']
    },
    { 
      name: 'Social', 
      icon: faChartBar, 
      adaptations: ['Proyectos grupales', 'Debates técnicos', 'Revisión entre pares']
    }
  ];
  
  // Elementos del perfil personalizado
  profileElements = [
    { name: 'Habilidades', icon: faFingerprint },
    { name: 'Intereses', icon: faLightbulb },
    { name: 'Conocimientos', icon: faBrain },
    { name: 'Objetivos', icon: faChartLine }
  ];
}