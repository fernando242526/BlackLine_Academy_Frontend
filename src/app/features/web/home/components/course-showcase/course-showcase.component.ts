import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faArrowRight, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './course-showcase.component.html',
  styleUrls: ['./course-showcase.component.scss']
})
export class CourseShowcaseComponent {
  // Iconos
  protected faStar = faStar;
  protected faStarHalfAlt = faStarHalfAlt;
  protected faArrowRight = faArrowRight;
  protected faUsers = faUsers;
  protected faClock = faClock;
  
  // Categorías de cursos
  categories = [
    'Todos',
    'Desarrollo Web',
    'Ciberseguridad',
    'Inteligencia Artificial',
    'Blockchain',
    'DevOps'
  ];
  
  activeCategory = 'Todos';
  
  // Cursos destacados
  featuredCourses = [
    {
      id: 1,
      title: 'Hackeo Ético y Ciberseguridad Avanzada',
      category: 'Ciberseguridad',
      image: '/assets/images/courses/cybersecurity.jpg',
      rating: 4.9,
      students: 2584,
      duration: '24 horas',
      instructor: 'Alex Rivera',
      price: 299,
      level: 'Intermedio',
      badgeText: 'DESTACADO'
    },
    {
      id: 2,
      title: 'Desarrollo Frontend con React y TypeScript',
      category: 'Desarrollo Web',
      image: '/assets/images/courses/frontend.jpg',
      rating: 4.8,
      students: 3752,
      duration: '32 horas',
      instructor: 'Maria Chen',
      price: 249,
      level: 'Todos los niveles',
      badgeText: 'POPULAR'
    },
    {
      id: 3,
      title: 'Machine Learning y Deep Learning',
      category: 'Inteligencia Artificial',
      image: '/assets/images/courses/ai.jpg',
      rating: 4.7,
      students: 1839,
      duration: '40 horas',
      instructor: 'David Kolev',
      price: 349,
      level: 'Avanzado',
      badgeText: 'NUEVO'
    },
    {
      id: 4,
      title: 'Smart Contracts y DApps con Solidity',
      category: 'Blockchain',
      image: '/assets/images/courses/blockchain.jpg',
      rating: 4.6,
      students: 967,
      duration: '28 horas',
      instructor: 'Samantha Wells',
      price: 279,
      level: 'Intermedio',
      badgeText: ''
    },
    {
      id: 5,
      title: 'DevOps y CI/CD con GitLab',
      category: 'DevOps',
      image: '/assets/images/courses/devops.jpg',
      rating: 4.8,
      students: 1245,
      duration: '20 horas',
      instructor: 'Marco Rossi',
      price: 229,
      level: 'Intermedio',
      badgeText: 'OFERTA'
    },
    {
      id: 6,
      title: 'Backend con Node.js y Express',
      category: 'Desarrollo Web',
      image: '/assets/images/courses/backend.jpg',
      rating: 4.7,
      students: 2191,
      duration: '26 horas',
      instructor: 'Elena Kim',
      price: 259,
      level: 'Todos los niveles',
      badgeText: ''
    }
  ];
  
  // Cambiar categoría
  changeCategory(category: string): void {
    this.activeCategory = category;
  }
  
  // Filtrar cursos por categoría
  get filteredCourses() {
    if (this.activeCategory === 'Todos') {
      return this.featuredCourses;
    }
    return this.featuredCourses.filter(course => course.category === this.activeCategory);
  }
  
  // Generar estrellas para la calificación
  getStars(rating: number): { type: string, active: boolean }[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push({ type: 'full', active: true });
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push({ type: 'half', active: true });
      } else {
        stars.push({ type: 'full', active: false });
      }
    }
    
    return stars;
  }
}