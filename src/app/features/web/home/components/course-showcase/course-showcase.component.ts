import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faClock, 
  faCode, 
  faUser,
  faArrowRight,
  faStar
} from '@fortawesome/free-solid-svg-icons';

interface Category {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  categoryColor: string;
  instructor: string;
  price: string;
  level: string;
  duration: string;
  modules: number;
  rating: number;
  codeSample: string;
}

@Component({
  selector: 'app-course-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './course-showcase.component.html',
  styleUrls: ['./course-showcase.component.scss']
})
export class CourseShowcaseComponent implements OnInit {
  // Iconos
  protected faClock = faClock;
  protected faCode = faCode;
  protected faUser = faUser;
  protected faArrowRight = faArrowRight;
  protected faStar = faStar;
  
  // Categorías disponibles
  categories: Category[] = [
    { id: 'all', name: 'Todos' },
    { id: 'programming', name: 'Programación' },
    { id: 'security', name: 'Ciberseguridad' },
    { id: 'data', name: 'Data Science' },
    { id: 'design', name: 'Diseño Digital' },
    { id: 'blockchain', name: 'Blockchain' }
  ];
  
  // Cursos destacados
  courses: Course[] = [
    {
      id: 'js-advanced',
      title: 'JavaScript Avanzado: Patrones y Arquitectura',
      description: 'Domina patrones de diseño, renderizado asíncrono y optimización de aplicaciones JavaScript modernas.',
      category: 'Programación',
      categoryId: 'programming',
      categoryColor: 'cyber-cyan',
      instructor: 'Alex Mercer',
      price: '$89.99',
      level: 'Intermedio/Avanzado',
      duration: '32 horas',
      modules: 8,
      rating: 4.8,
      codeSample: 'const asyncPipe = (...fns) => input => fns.reduce(async (acc, fn) => fn(await acc), input);'
    },
    {
      id: 'ethical-hacking',
      title: 'Hacking Ético: Penetration Testing',
      description: 'Aprende técnicas avanzadas de penetration testing y evaluación de vulnerabilidades en sistemas reales.',
      category: 'Ciberseguridad',
      categoryId: 'security',
      categoryColor: 'critical-red',
      instructor: 'Nadia Kerrigan',
      price: '$119.99',
      level: 'Avanzado',
      duration: '40 horas',
      modules: 10,
      rating: 4.9,
      codeSample: 'nmap -sS -T4 -A -v -oA scan_results target_domain'
    },
    {
      id: 'data-ai',
      title: 'Machine Learning para Análisis Predictivo',
      description: 'Implementa modelos de IA para predicciones basadas en datos masivos con técnicas de vanguardia.',
      category: 'Data Science',
      categoryId: 'data',
      categoryColor: 'glitch-green',
      instructor: 'Samira Chen',
      price: '$99.99',
      level: 'Intermedio',
      duration: '36 horas',
      modules: 9,
      rating: 4.7,
      codeSample: 'model = XGBClassifier(learning_rate=0.1, max_depth=7, n_estimators=200)'
    },
    {
      id: 'ux-design',
      title: 'Interfaces Neomórficas y Cyberpunk',
      description: 'Diseña interfaces futuristas combinando principios de usabilidad con estéticas de ciencia ficción.',
      category: 'Diseño Digital',
      categoryId: 'design',
      categoryColor: 'neon-violet',
      instructor: 'Diana Vega',
      price: '$79.99',
      level: 'Todos los niveles',
      duration: '28 horas',
      modules: 7,
      rating: 4.6,
      codeSample: '.neon-button { box-shadow: 0 0 10px rgba(0, 255, 171, 0.8); }'
    },
    {
      id: 'web3-dapps',
      title: 'Desarrollo de DApps en Ethereum',
      description: 'Crea aplicaciones descentralizadas completas con Solidity, Web3.js y arquitecturas modernas.',
      category: 'Blockchain',
      categoryId: 'blockchain',
      categoryColor: 'pulse-violet',
      instructor: 'Marcus Wright',
      price: '$129.99',
      level: 'Intermedio/Avanzado',
      duration: '45 horas',
      modules: 12,
      rating: 4.9,
      codeSample: 'contract TokenSwap { mapping(address => uint) balances; }'
    },
    {
      id: 'react-native',
      title: 'Desarrollo de Apps con React Native',
      description: 'Construye aplicaciones móviles nativas multiplataforma con React y JavaScript.',
      category: 'Programación',
      categoryId: 'programming',
      categoryColor: 'cyber-cyan',
      instructor: 'Leila Patel',
      price: '$94.99',
      level: 'Intermedio',
      duration: '34 horas',
      modules: 8,
      rating: 4.7,
      codeSample: 'export default function App() { return <NavigationContainer>{/* ... */}</NavigationContainer>; }'
    }
  ];
  
  // Propiedades para filtrado
  selectedCategory: string = 'all';
  filteredCourses: Course[] = [];
  
  ngOnInit(): void {
    // Inicializar con todos los cursos
    this.filteredCourses = [...this.courses];
  }
  
  // Filtrar cursos por categoría
  filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    
    if (categoryId === 'all') {
      this.filteredCourses = [...this.courses];
    } else {
      this.filteredCourses = this.courses.filter(course => course.categoryId === categoryId);
    }
  }
}