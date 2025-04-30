import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChalkboardTeacher,
  faUserGraduate,
  faRoute,
  faComments,
  faCode,
  faTools,
  faBrain,
  faGraduationCap,
  faNetworkWired,
  faShieldAlt,
  faRocket,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';

interface Role {
  title: string;
  icon: IconDefinition;
  description: string;
  responsibilities: string[];
  skills: string[];
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  @Input() icon: IconDefinition | null = null;
  @Input() accentColor: string = 'neon-copper';
  
  // Iconos
  protected faChalkboardTeacher = faChalkboardTeacher;
  protected faUserGraduate = faUserGraduate;
  
  // Roles
  roles: Role[] = [
    {
      title: 'Mentor Técnico',
      icon: faChalkboardTeacher,
      description: 'En BlackLine Academy, el docente no es un simple transmisor de información, sino un mentor que guía, desafía y potencia el aprendizaje activo.',
      responsibilities: [
        'Diseñar desafíos técnicos progresivos',
        'Proporcionar retroalimentación técnica detallada',
        'Facilitar discusiones y debates constructivos',
        'Promover el pensamiento crítico y analítico',
        'Mantenerse actualizado en tecnologías emergentes'
      ],
      skills: [
        'Experiencia profesional real',
        'Pensamiento lateral',
        'Comunicación técnica clara',
        'Capacidad para simplificar conceptos complejos',
        'Mentoría adaptativa'
      ]
    },
    {
      title: 'Agente Estudiante',
      icon: faUserGraduate,
      description: 'El estudiante es un participante activo en su proceso de aprendizaje, un agente que explora, experimenta y construye su propio conocimiento.',
      responsibilities: [
        'Participar activamente en desafíos técnicos',
        'Colaborar con otros estudiantes en proyectos',
        'Experimentar con diferentes enfoques y soluciones',
        'Reflexionar sobre el propio aprendizaje',
        'Contribuir a la comunidad de conocimiento'
      ],
      skills: [
        'Autoaprendizaje continuo',
        'Resolución creativa de problemas',
        'Capacidad de análisis y síntesis',
        'Colaboración efectiva',
        'Adaptabilidad y resiliencia'
      ]
    }
  ];
  
  // Habilidades clave para cada rol
  mentorSkillIcons = [
    { name: 'Guía', icon: faRoute },
    { name: 'Facilitador', icon: faComments },
    { name: 'Codificador', icon: faCode },
    { name: 'Solucionador', icon: faTools }
  ];
  
  studentSkillIcons = [
    { name: 'Analítico', icon: faBrain },
    { name: 'Proactivo', icon: faRocket },
    { name: 'Colaborativo', icon: faNetworkWired },
    { name: 'Práctico', icon: faLaptopCode }
  ];
}