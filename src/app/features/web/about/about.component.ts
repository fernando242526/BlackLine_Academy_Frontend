import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faPlay,
  faShieldAlt,
  faCode,
  faLock,
  faServer,
  faGlobe,
  faGraduationCap,
  faUsers,
  faRocket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter as fabTwitter, 
  faGithub as fabGithub, 
  faLinkedinIn as fabLinkedin, 
  faDribbble as fabDribbble, 
  faMediumM as fabMedium 
} from '@fortawesome/free-brands-svg-icons';
import { ParticleBackgroundComponent } from '../../../shared/components/particle-background/particle-background.component';
import { TimelineComponent } from './components/timeline/timeline.component';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  id: number;
  name: string;
  lastName: string;
  role: string;
  bio: string;
  accentColor: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

interface Value {
  id: number;
  title: string;
  description: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ParticleBackgroundComponent,
    TimelineComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  // Iconos
  protected faPlay = faPlay;
  protected faShieldAlt = faShieldAlt;
  protected faCode = faCode;
  protected faLock = faLock;
  protected faServer = faServer;
  protected faGlobe = faGlobe;
  protected faGraduationCap = faGraduationCap;
  protected faUsers = faUsers;
  protected faRocket = faRocket;
  protected faUserPlus = faUserPlus;
  
  // Iconos de redes sociales
  private socialIcons = {
    twitter: fabTwitter,
    github: fabGithub,
    linkedin: fabLinkedin,
    dribbble: fabDribbble,
    medium: fabMedium
  };
  
  // Obtener icono por nombre de plataforma
  getSocialIcon(platform: string): any {
    return this.socialIcons[platform as keyof typeof this.socialIcons] || fabGithub;
  }
  
  // Elementos de la línea de tiempo
  timelineItems: TimelineItem[] = [
    {
      year: '2020',
      title: 'El Inicio',
      description: 'Un grupo de desarrolladores e instructores inconformes con la educación tecnológica tradicional fundan BlackLine Academy como un proyecto underground.'
    },
    {
      year: '2021',
      title: 'Primeros Cursos',
      description: 'Lanzamiento de los primeros 10 cursos especializados, enfocados en habilidades de programación avanzada y ciberseguridad.'
    },
    {
      year: '2022',
      title: 'Comunidad Global',
      description: 'La plataforma supera los 1,000 estudiantes activos y comienza a formarse una comunidad global de profesionales.'
    },
    {
      year: '2023',
      title: 'Expansión del Contenido',
      description: 'Se amplía la oferta a más de 50 cursos con especialización en IA, blockchain y desarrollo fullstack avanzado.'
    },
    {
      year: '2024',
      title: 'Reconocimiento de la Industria',
      description: 'BlackLine Academy es reconocida por empresas tecnológicas como una fuente de talento altamente cualificado y especializado.'
    },
    {
      year: '2025',
      title: 'Revolución Educativa',
      description: 'Presente: redefiniendo la educación tecnológica con más de 5,000 miembros activos y una comunidad vibrante de profesionales.'
    }
  ];
  
  // Miembros del equipo
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Alex',
      lastName: 'Mercer',
      role: 'Fundador & CTO',
      bio: 'Ex-ingeniero de seguridad en Silicon Valley. Especialista en criptografía y sistemas distribuidos.',
      accentColor: 'neon-violet',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    },
    {
      id: 2,
      name: 'Sophia',
      lastName: 'Chen',
      role: 'Directora de Contenidos',
      bio: 'PhD en CS. Anteriormente desarrolladora de algoritmos de IA en una de las big tech.',
      accentColor: 'cyber-cyan',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'medium', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    },
    {
      id: 3,
      name: 'Marcus',
      lastName: 'Reeves',
      role: 'Especialista en Blockchain',
      bio: 'Desarrollador blockchain con experiencia en proyectos descentralizados de alto impacto.',
      accentColor: 'pulse-violet',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'medium', url: '#' }
      ]
    },
    {
      id: 4,
      name: 'Valeria',
      lastName: 'Torres',
      role: 'UX/UI Lead',
      bio: 'Diseñadora de interfaces futuristas y experta en experiencias inmersivas.',
      accentColor: 'glitch-green',
      socialLinks: [
        { platform: 'dribbble', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    },
    {
      id: 5,
      name: 'Kieran',
      lastName: 'Patel',
      role: 'Ingeniero DevOps',
      bio: 'Arquitecto de infraestructura cloud y experto en automatización de sistemas.',
      accentColor: 'critical-red',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    },
    {
      id: 6,
      name: 'Naomi',
      lastName: 'Zhao',
      role: 'Especialista Seguridad',
      bio: 'Ethical hacker con experiencia en pentesting y seguridad ofensiva avanzada.',
      accentColor: 'neon-copper',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'medium', url: '#' },
        { platform: 'twitter', url: '#' }
      ]
    },
    {
      id: 7,
      name: 'Ethan',
      lastName: 'Kowalski',
      role: 'Lead Developer',
      bio: 'Full stack developer especializado en arquitecturas escalables y microservicios.',
      accentColor: 'prisma-amber',
      socialLinks: [
        { platform: 'github', url: '#' },
        { platform: 'linkedin', url: '#' },
        { platform: 'medium', url: '#' }
      ]
    },
    {
      id: 8,
      name: 'Maya',
      lastName: 'Rivera',
      role: 'Directora de Crecimiento',
      bio: 'Estratega de crecimiento y comunidad con enfoque en educación tecnológica disruptiva.',
      accentColor: 'cyber-cyan',
      socialLinks: [
        { platform: 'linkedin', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'medium', url: '#' }
      ]
    }
  ];
  
  // Valores
  values: Value[] = [
    {
      id: 1,
      title: 'Conocimiento sin Barreras',
      description: 'Creemos en un acceso democrático a la educación tecnológica sin filtros corporativos o institucionales.',
      icon: faLock,
      color: 'neon-violet'
    },
    {
      id: 2,
      title: 'Excelencia Técnica',
      description: 'Nos comprometemos con los más altos estándares técnicos en cada curso y contenido que producimos.',
      icon: faCode,
      color: 'cyber-cyan'
    },
    {
      id: 3,
      title: 'Innovación Constante',
      description: 'Exploramos continuamente nuevas fronteras tecnológicas para mantener nuestro contenido a la vanguardia.',
      icon: faRocket,
      color: 'glitch-green'
    },
    {
      id: 4,
      title: 'Comunidad Colaborativa',
      description: 'Fomentamos una comunidad donde el conocimiento fluye libremente entre miembros y mentores.',
      icon: faUsers,
      color: 'prisma-amber'
    },
    {
      id: 5,
      title: 'Aprendizaje Práctico',
      description: 'Priorizamos la aplicación práctica del conocimiento en proyectos reales sobre la teoría abstracta.',
      icon: faGraduationCap,
      color: 'critical-red'
    },
    {
      id: 6,
      title: 'Ética Digital',
      description: 'Promovemos un uso ético y responsable de la tecnología y las habilidades aprendidas.',
      icon: faShieldAlt,
      color: 'neon-copper'
    }
  ];
}