import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCheck,
  faShieldAlt,
  faUsers,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

interface Plan {
  name: string;
  price: string;
  interval: string;
  features: string[];
  buttonText: string;
  accentColor: string;
  isPrimary: boolean;
}

interface Benefit {
  title: string;
  description: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss']
})
export class CtaSectionComponent {
  // Iconos
  protected faCheck = faCheck;
  protected faShieldAlt = faShieldAlt;
  protected faUsers = faUsers;
  protected faCertificate = faCertificate;
  
  // Planes de suscripción
  plans: Plan[] = [
    {
      name: 'Agente Básico',
      price: '$19.99',
      interval: 'mes',
      features: [
        'Acceso a +30 cursos básicos',
        'Foro de la comunidad',
        'Ejercicios prácticos',
        'Certificados básicos'
      ],
      buttonText: 'Comenzar',
      accentColor: 'cyber-cyan',
      isPrimary: false
    },
    {
      name: 'Operativo Pro',
      price: '$49.99',
      interval: 'mes',
      features: [
        'Acceso a +80 cursos avanzados',
        'Sesiones grupales mensuales',
        'Proyectos con feedback',
        'Certificaciones validadas',
        'Acceso a eventos virtuales'
      ],
      buttonText: 'Únete Ahora',
      accentColor: 'neon-violet',
      isPrimary: true
    },
    {
      name: 'Élite',
      price: '$99.99',
      interval: 'mes',
      features: [
        'Acceso completo a todos los cursos',
        'Mentorías 1:1 con expertos',
        'Proyectos avanzados',
        'Certificaciones premium',
        'Networking con profesionales',
        'Acceso a eventos exclusivos'
      ],
      buttonText: 'Consigue Élite',
      accentColor: 'glitch-green',
      isPrimary: false
    }
  ];
  
  // Beneficios adicionales
  benefits: Benefit[] = [
    {
      title: 'Conocimiento Verificado',
      description: 'Contenido actualizado y validado por expertos de la industria para garantizar relevancia y precisión.',
      icon: faShieldAlt,
      color: 'cyber-cyan'
    },
    {
      title: 'Comunidad Élite',
      description: 'Únete a una red global de profesionales, comparte ideas y colabora en proyectos innovadores.',
      icon: faUsers,
      color: 'neon-violet'
    },
    {
      title: 'Certificaciones Reconocidas',
      description: 'Obtén credenciales validadas que potencian tu perfil profesional y abren nuevas oportunidades.',
      icon: faCertificate,
      color: 'glitch-green'
    }
  ];
}