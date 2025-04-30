import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { 
  faVrCardboard, 
  faCloud, 
  faDatabase, 
  faRobot, 
  faServer, 
  faShield, 
  faCode,
  faLaptopCode,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';

interface Technology {
  name: string;
  description: string;
  icon: IconDefinition;
  useCases: string[];
}

@Component({
  selector: 'app-educational-tech',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './educational-tech.component.html',
  styleUrls: ['./educational-tech.component.scss']
})
export class EducationalTechComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'pulse-violet';
  
  // Tecnologías principales
  technologies: Technology[] = [
    {
      name: 'Entornos Virtuales Inmersivos',
      description: 'Tecnología de realidad virtual y aumentada para simular entornos de trabajo y situaciones prácticas de tecnología.',
      icon: faVrCardboard,
      useCases: [
        'Simulación de infraestructuras de red',
        'Visualización de arquitecturas de sistemas',
        'Prácticas de montaje y configuración de hardware'
      ]
    },
    {
      name: 'Laboratorios Cloud',
      description: 'Infraestructura en la nube para experimentación y desarrollo en entornos reales pero aislados y seguros.',
      icon: faCloud,
      useCases: [
        'Despliegue de aplicaciones en producción',
        'Configuración de servicios cloud',
        'Prácticas de escalabilidad y alta disponibilidad'
      ]
    },
    {
      name: 'Plataformas de Data Science',
      description: 'Herramientas especializadas para el análisis de datos, machine learning y procesamiento estadístico.',
      icon: faDatabase,
      useCases: [
        'Análisis exploratorio de datos reales',
        'Implementación de modelos predictivos',
        'Visualización avanzada de información'
      ]
    },
    {
      name: 'Asistentes IA',
      description: 'Sistemas de inteligencia artificial que proporcionan asistencia personalizada y adaptada a cada estudiante.',
      icon: faRobot,
      useCases: [
        'Tutorías personalizadas 24/7',
        'Generación de ejercicios adaptados',
        'Análisis de progreso y recomendaciones'
      ]
    }
  ];
  
  // Herramientas complementarias
  complementaryTools = [
    { name: 'Sandboxes de Seguridad', icon: faShield },
    { name: 'APIs de Aprendizaje', icon: faServer },
    { name: 'IDEs Colaborativos', icon: faCode },
    { name: 'Plataformas CTF', icon: faLaptopCode },
    { name: 'Virtual Classrooms', icon: faChalkboardTeacher }
  ];
}