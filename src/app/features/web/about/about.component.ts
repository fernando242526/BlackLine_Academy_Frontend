import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faRocket, 
  faCode, 
  faShieldAlt, 
  faGraduationCap, 
  faUsers, 
  faLaptopCode,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  // Iconos
  protected faRocket = faRocket;
  protected faCode = faCode;
  protected faShield = faShieldAlt;
  protected faGraduationCap = faGraduationCap;
  protected faUsers = faUsers;
  protected faLaptopCode = faLaptopCode;
  protected faChevronRight = faChevronRight;
  
  // Valores de la academia
  values = [
    {
      icon: this.faCode,
      title: 'Innovación Constante',
      description: 'Nos mantenemos a la vanguardia tecnológica para ofrecer contenido actualizado y relevante.'
    },
    {
      icon: this.faShield,
      title: 'Integridad Académica',
      description: 'Promovemos el conocimiento genuino y práctico, sin censura comercial o institucional.'
    },
    {
      icon: this.faUsers,
      title: 'Comunidad Colaborativa',
      description: 'Facilitamos el intercambio de ideas y la creación de redes profesionales entre estudiantes.'
    },
    {
      icon: this.faGraduationCap,
      title: 'Excelencia Educativa',
      description: 'Mantenemos los más altos estándares de calidad en nuestro contenido y metodología.'
    }
  ];
  
  // Equipo
  team = [
    {
      name: 'Alex Mercer',
      role: 'Fundador & CEO',
      bio: 'Ex-ingeniero de seguridad en empresas de Silicon Valley, Alex fundó BlackLine Academy para democratizar el conocimiento tecnológico avanzado.',
      image: 'assets/images/team/alex.jpg'
    },
    {
      name: 'Sofia Chen',
      role: 'CTO & Lead Instructor',
      bio: 'Con más de 15 años de experiencia en desarrollo de software, Sofia supervisa la calidad técnica y pedagógica de todos nuestros cursos.',
      image: 'assets/images/team/sofia.jpg'
    },
    {
      name: 'Marcus Reynolds',
      role: 'Director de Ciberseguridad',
      bio: 'Ethical hacker reconocido internacionalmente, Marcus lidera nuestro programa de certificaciones en seguridad informática.',
      image: 'assets/images/team/marcus.jpg'
    },
    {
      name: 'Valentina Kowalski',
      role: 'Directora de Innovación',
      bio: 'Especialista en IA y blockchain, Valentina se asegura de que nuestro contenido esté siempre a la vanguardia de las tecnologías emergentes.',
      image: 'assets/images/team/valentina.jpg'
    }
  ];
  
  // Datos estadísticos
  stats = [
    { value: '5+', label: 'Años de experiencia' },
    { value: '50+', label: 'Cursos avanzados' },
    { value: '15+', label: 'Instructores expertos' },
    { value: '25k+', label: 'Estudiantes graduados' }
  ];
}