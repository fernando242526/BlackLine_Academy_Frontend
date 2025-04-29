import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faShieldHalved, 
  faRocket, 
  faGraduationCap, 
  faDesktop, 
  faCertificate, 
  faUsers,
  faCode,
  faLightbulb,
  faServer
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Feature {
  title: string;
  description: string;
  icon: IconDefinition;
  colorClass: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent {
  // Lista de características
  features: Feature[] = [
    {
      title: 'Conocimiento sin censura',
      description: 'Aprende sin restricciones. Contenido real sin filtros corporativos o institucionales que limiten tu desarrollo.',
      icon: faShieldHalved,
      colorClass: 'cyber-cyan'
    },
    {
      title: 'Aprende a tu ritmo',
      description: 'Cursos asíncronos que te permiten avanzar cuando y donde quieras, adaptándose a tu estilo de vida.',
      icon: faRocket,
      colorClass: 'neon-violet'
    },
    {
      title: 'Profesores expertos',
      description: 'Los mejores profesionales del sector comparten su experiencia real, técnicas y conocimientos prácticos.',
      icon: faGraduationCap,
      colorClass: 'glitch-green'
    },
    {
      title: 'Plataforma interactiva',
      description: 'Interfaz moderna y dinámica que te sumerge completamente en el aprendizaje con herramientas de vanguardia.',
      icon: faDesktop,
      colorClass: 'prisma-amber'
    },
    {
      title: 'Certificaciones validadas',
      description: 'Obtén reconocimiento oficial de tus habilidades adquiridas, respaldado por la industria tecnológica.',
      icon: faCertificate,
      colorClass: 'pulse-violet'
    },
    {
      title: 'Comunidad activa',
      description: 'Conecta con otros estudiantes y crea una red de contactos profesionales para proyectos colaborativos.',
      icon: faUsers,
      colorClass: 'neon-violet'
    },
    {
      title: 'Contenido actualizado',
      description: 'Temarios constantemente actualizados a las últimas tecnologías y tendencias de la industria.',
      icon: faCode,
      colorClass: 'cyber-cyan'
    },
    {
      title: 'Mentoría personalizada',
      description: 'Acceso a sesiones de mentoría con expertos para resolver dudas específicas de tus proyectos.',
      icon: faLightbulb,
      colorClass: 'glitch-green'
    },
    {
      title: 'Laboratorios prácticos',
      description: 'Entornos virtuales preconfigurados para practicar tus habilidades en escenarios reales.',
      icon: faServer,
      colorClass: 'critical-red'
    }
  ];
}