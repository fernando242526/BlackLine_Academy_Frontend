import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { 
  faFilter, 
  faSort, 
  faSearch, 
  faChevronDown, 
  faStar, 
  faUsers,
  faClock,
  faTag,
  faBookmark,
  faFire,
  faAward
} from '@fortawesome/free-solid-svg-icons';

/**
 * Interfaz simplificada para los cursos (versión interna del componente)
 */
interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  duration: string;
  level: string;
  levelColor: string;
  category: string;
  subCategory?: string;
  instructorName: string;
  instructorAvatar?: string;
  rating: number;
  studentsCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  tags?: string[];
}

/**
 * Interfaz simplificada para las categorías (versión interna del componente)
 */
interface Category {
  id: string;
  name: string;
  slug: string;
  coursesCount: number;
  subCategories?: SubCategory[];
}

/**
 * Interfaz simplificada para las subcategorías (versión interna del componente)
 */
interface SubCategory {
  id: string;
  name: string;
  slug: string;
  coursesCount: number;
}

/**
 * Interfaz para los niveles de dificultad (versión interna del componente)
 */
interface Level {
  id: string;
  name: string;
  color: string;
}

/**
 * Componente de la página de listado de cursos
 */
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export default class CoursesComponent {
  // Propiedad para usar Math en la plantilla
  protected Math = Math;
  
  // Iconos
  protected faFilter = faFilter;
  protected faSort = faSort;
  protected faSearch = faSearch;
  protected faChevronDown = faChevronDown;
  protected faStar = faStar;
  protected faUsers = faUsers;
  protected faClock = faClock;
  protected faTag = faTag;
  protected faBookmark = faBookmark;
  protected faFire = faFire;
  protected faAward = faAward;
  
  // Estado de filtros
  protected showFilters = signal<boolean>(false);
  protected selectedCategory = signal<string | null>(null);
  protected selectedSubCategory = signal<string | null>(null);
  protected selectedLevel = signal<string | null>(null);
  protected searchQuery = signal<string>('');
  protected sortOption = signal<string>('newest');
  
  // Propiedades para formularios
  protected searchInput = '';
  protected currentSortOption = 'newest';
  
  // Datos mockup para el diseño
  protected categories: Category[] = [
    {
      id: '1',
      name: 'Desarrollo Web',
      slug: 'desarrollo-web',
      coursesCount: 12,
      subCategories: [
        { id: '101', name: 'Frontend', slug: 'frontend', coursesCount: 5 },
        { id: '102', name: 'Backend', slug: 'backend', coursesCount: 4 },
        { id: '103', name: 'Fullstack', slug: 'fullstack', coursesCount: 3 }
      ]
    },
    {
      id: '2',
      name: 'Ciberseguridad',
      slug: 'ciberseguridad',
      coursesCount: 8,
      subCategories: [
        { id: '201', name: 'Hacking Ético', slug: 'hacking-etico', coursesCount: 3 },
        { id: '202', name: 'Seguridad Defensiva', slug: 'seguridad-defensiva', coursesCount: 2 },
        { id: '203', name: 'Forense Digital', slug: 'forense-digital', coursesCount: 3 }
      ]
    },
    {
      id: '3',
      name: 'Inteligencia Artificial',
      slug: 'inteligencia-artificial',
      coursesCount: 6,
      subCategories: [
        { id: '301', name: 'Machine Learning', slug: 'machine-learning', coursesCount: 2 },
        { id: '302', name: 'Deep Learning', slug: 'deep-learning', coursesCount: 2 },
        { id: '303', name: 'NLP', slug: 'nlp', coursesCount: 2 }
      ]
    }
  ];
  
  protected levels: Level[] = [
    { id: '1', name: 'Principiante', color: 'glitch-green' },
    { id: '2', name: 'Intermedio', color: 'cyber-cyan' },
    { id: '3', name: 'Avanzado', color: 'neon-violet' },
    { id: '4', name: 'Experto', color: 'critical-red' }
  ];
  
  protected courses: Course[] = [
    {
      id: '1',
      title: 'Maestría en Angular Avanzado',
      slug: 'maestria-angular-avanzado',
      description: 'Domina Angular con patrones avanzados, optimización de rendimiento y arquitecturas escalables para aplicaciones empresariales.',
      shortDescription: 'Lleva tus habilidades de Angular al siguiente nivel con técnicas profesionales',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=Angular+Avanzado',
      price: 79.99,
      discountPrice: 59.99,
      duration: '32h 15m',
      level: 'Avanzado',
      levelColor: 'neon-violet',
      category: 'Desarrollo Web',
      subCategory: 'Frontend',
      instructorName: 'Alexandra Reyes',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=A.R',
      rating: 4.8,
      studentsCount: 1243,
      isFeatured: true,
      isNew: false,
      isTrending: true,
      tags: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Performance']
    },
    {
      id: '2',
      title: 'React y el Ecosistema Moderno',
      slug: 'react-ecosistema-moderno',
      description: 'Construye aplicaciones web de alto rendimiento con React y las últimas herramientas del ecosistema front-end moderno.',
      shortDescription: 'Aprende React y todo su ecosistema moderno de desarrollo',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=React+Moderno',
      price: 69.99,
      discountPrice: 49.99,
      duration: '28h 40m',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      category: 'Desarrollo Web',
      subCategory: 'Frontend',
      instructorName: 'Marco Torres',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=M.T',
      rating: 4.7,
      studentsCount: 1876,
      isFeatured: true,
      isNew: false,
      isTrending: true,
      tags: ['React', 'JavaScript', 'Redux', 'Hooks', 'Next.js']
    },
    {
      id: '3',
      title: 'Node.js: Arquitectura de Microservicios',
      slug: 'nodejs-arquitectura-microservicios',
      description: 'Diseña, construye y despliega aplicaciones escalables basadas en microservicios con Node.js y Docker.',
      shortDescription: 'Construye sistemas escalables con arquitecturas modernas',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=Microservicios+Node.js',
      price: 89.99,
      discountPrice: 69.99,
      duration: '36h 20m',
      level: 'Avanzado',
      levelColor: 'neon-violet',
      category: 'Desarrollo Web',
      subCategory: 'Backend',
      instructorName: 'Carlos Mendoza',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=C.M',
      rating: 4.9,
      studentsCount: 1535,
      isFeatured: true,
      isNew: false,
      isTrending: false,
      tags: ['Node.js', 'Microservicios', 'Docker', 'Kubernetes', 'Express']
    },
    {
      id: '4',
      title: 'Desarrollo Fullstack con JavaScript Moderno',
      slug: 'desarrollo-fullstack-javascript-moderno',
      description: 'Domina el desarrollo frontend y backend con JavaScript moderno, construyendo aplicaciones completas desde cero.',
      shortDescription: 'Conviértete en desarrollador full-stack con JavaScript moderno',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=Fullstack+JS',
      price: 99.99,
      discountPrice: 79.99,
      duration: '45h 30m',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      category: 'Desarrollo Web',
      subCategory: 'Fullstack',
      instructorName: 'Laura Gómez',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=L.G',
      rating: 4.8,
      studentsCount: 2154,
      isFeatured: true,
      isNew: false,
      isTrending: true,
      tags: ['JavaScript', 'Node.js', 'MongoDB', 'React', 'Express']
    },
    {
      id: '5',
      title: 'Hacking Ético: Pentesting Profesional',
      slug: 'hacking-etico-pentesting-profesional',
      description: 'Aprende metodologías profesionales de pentesting y hacking ético utilizadas por los mejores especialistas en seguridad.',
      shortDescription: 'Domina las técnicas de pentesting utilizadas por profesionales',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=Pentesting',
      price: 109.99,
      discountPrice: 89.99,
      duration: '38h 45m',
      level: 'Avanzado',
      levelColor: 'neon-violet',
      category: 'Ciberseguridad',
      subCategory: 'Hacking Ético',
      instructorName: 'Javier Núñez',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=J.N',
      rating: 4.9,
      studentsCount: 1872,
      isFeatured: false,
      isNew: false,
      isTrending: true,
      tags: ['Pentesting', 'Kali Linux', 'Metasploit', 'Burp Suite', 'OWASP']
    },
    {
      id: '6',
      title: 'Machine Learning: De Cero a Experto',
      slug: 'machine-learning-zero-to-hero',
      description: 'Aprende desde los fundamentos hasta técnicas avanzadas de Machine Learning, implementando proyectos reales con Python.',
      shortDescription: 'Domina Machine Learning desde cero con proyectos prácticos',
      imageUrl: 'https://placehold.co/800x600/292d35/e0e0e0?text=ML+Expert',
      price: 129.99,
      discountPrice: 99.99,
      duration: '42h 15m',
      level: 'Intermedio',
      levelColor: 'cyber-cyan',
      category: 'Inteligencia Artificial',
      subCategory: 'Machine Learning',
      instructorName: 'Elena Martínez',
      instructorAvatar: 'https://placehold.co/200x200/292d35/e0e0e0?text=E.M',
      rating: 4.8,
      studentsCount: 1456,
      isFeatured: false,
      isNew: true,
      isTrending: false,
      tags: ['Python', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Deep Learning']
    }
  ];
  
  /**
   * Alterna la visibilidad del panel de filtros
   */
  protected toggleFilters(): void {
    this.showFilters.update(current => !current);
  }
  
  /**
   * Maneja el cambio de categoría seleccionada
   */
  protected setCategory(categoryId: string | null): void {
    this.selectedCategory.set(categoryId);
    // Al cambiar de categoría, reseteamos la subcategoría
    this.selectedSubCategory.set(null);
  }
  
  /**
   * Maneja el cambio de subcategoría seleccionada
   */
  protected setSubCategory(subCategoryId: string | null): void {
    this.selectedSubCategory.set(subCategoryId);
  }
  
  /**
   * Maneja el cambio de nivel seleccionado
   */
  protected setLevel(levelId: string | null): void {
    this.selectedLevel.set(levelId);
  }
  
  /**
   * Maneja el cambio de opción de ordenamiento
   */
  protected onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOption.set(select.value);
  }
  
  /**
   * Actualiza el término de búsqueda
   */
  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
  
  /**
   * Limpia todos los filtros aplicados
   */
  protected clearFilters(): void {
    this.selectedCategory.set(null);
    this.selectedSubCategory.set(null);
    this.selectedLevel.set(null);
    this.searchQuery.set('');
    this.searchInput = '';
    this.sortOption.set('newest');
    this.currentSortOption = 'newest';
  }
  
  /**
   * Genera un arreglo de números para las estrellas de calificación
   */
  protected getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return Array(fullStars).fill(1).concat(
      hasHalfStar ? [0.5] : [],
      Array(emptyStars).fill(0)
    );
  }
  
  /**
   * Calcula el porcentaje de descuento
   */
  protected getDiscountPercentage(originalPrice: number, discountPrice: number): number {
    return Math.round(100 - (discountPrice / originalPrice * 100));
  }
  
  /**
   * Obtiene el color de nivel para un curso
   */
  protected getLevelColorClass(levelColor: string, element: string): string {
    return `${element}-${levelColor}`;
  }
}