import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faShieldHalved, 
  faRocket, 
  faGraduationCap, 
  faDesktop, 
  faCertificate, 
  faUsers 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss']
})
export class FeaturesSectionComponent {
  // Iconos
  protected faShield = faShieldHalved;
  protected faRocket = faRocket;
  protected faGraduationCap = faGraduationCap;
  protected faDesktop = faDesktop;
  protected faCertificate = faCertificate;
  protected faUsers = faUsers;
  
  // Características
  features = [
    {
      title: 'Conocimiento sin censura',
      description: 'Aprende sin restricciones. Contenido real sin filtros corporativos o institucionales.',
      icon: this.faShield
    },
    {
      title: 'Aprende a tu ritmo',
      description: 'Cursos asíncronos que te permiten avanzar cuando y donde quieras.',
      icon: this.faRocket
    },
    {
      title: 'Profesores expertos',
      description: 'Los mejores profesionales del sector comparten su experiencia real.',
      icon: this.faGraduationCap
    },
    {
      title: 'Plataforma interactiva',
      description: 'Interfaz moderna y dinámica que te sumerge completamente en el aprendizaje.',
      icon: this.faDesktop
    },
    {
      title: 'Certificaciones validadas',
      description: 'Obtén reconocimiento oficial de tus habilidades adquiridas.',
      icon: this.faCertificate
    },
    {
      title: 'Comunidad activa',
      description: 'Conecta con otros estudiantes y crea una red de contactos profesionales.',
      icon: this.faUsers
    }
  ];
}