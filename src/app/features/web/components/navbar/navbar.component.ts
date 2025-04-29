import { Component, OnInit, OnDestroy, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, 
  faChevronDown, 
  faBars, 
  faTimes,
  faHome,
  faInfoCircle,
  faBook,
  faGraduationCap,
  faEnvelope,
  faCertificate,
  faUserCircle,
  faCog,
  faBell,
  faSignOutAlt,
  faTachometerAlt,
  faChalkboardTeacher,
  faBookReader,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  exact: boolean;
}

interface UserMenuItem {
  label: string;
  path: string;
  icon: any;
  divider?: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Servicios
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  
  // Iconos
  protected faUser = faUser;
  protected faChevronDown = faChevronDown;
  protected faBars = faBars;
  protected faTimes = faTimes;
  
  // Estado del componente
  scrolled = false;
  mobileMenuOpen = false;
  userMenuOpen = false;
  
  // Elementos de navegación
  navItems: NavItem[] = [
    { label: 'Inicio', path: '/', icon: faHome, exact: true },
    { label: 'Nosotros', path: '/nosotros', icon: faInfoCircle, exact: false },
    { label: 'Cursos', path: '/cursos', icon: faBook, exact: false },
    { label: 'Metodología', path: '/metodos-enseñanza', icon: faGraduationCap, exact: false },
    { label: 'Certificaciones', path: '/certificaciones', icon: faCertificate, exact: false },
    { label: 'Contacto', path: '/contactanos', icon: faEnvelope, exact: false }
  ];
  
  // Elementos del menú de usuario
  userMenuItems: UserMenuItem[] = [];
  
  // Exportar señales del AuthService
  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;
  
  ngOnInit(): void {
    // Comprobar scroll inicial
    this.checkScroll();
    
    // Configurar menú de usuario según roles
    this.setupUserMenu();
    
    // Añadir listener para cerrar menús al hacer clic fuera
    document.addEventListener('click', this.handleOutsideClick);
  }
  
  ngOnDestroy(): void {
    // Remover listener al destruir el componente
    document.removeEventListener('click', this.handleOutsideClick);
  }
  
  @HostListener('window:scroll', [])
  checkScroll(): void {
    this.scrolled = window.scrollY > 20;
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Cerrar menú de usuario si está abierto
    if (this.mobileMenuOpen) {
      this.userMenuOpen = false;
    }
  }
  
  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }
  
  // Configurar opciones del menú de usuario según roles
  private setupUserMenu(): void {
    const baseMenuItems: UserMenuItem[] = [
      { label: 'Mi Perfil', path: '/perfil', icon: faUserCircle },
      { label: 'Configuración', path: '/configuracion', icon: faCog },
      { label: 'Notificaciones', path: '/notificaciones', icon: faBell },
      { divider: true, label: '', path: '', icon: null },
      { 
        label: 'Cerrar Sesión', 
        path: '/auth/login', 
        icon: faSignOutAlt,
        action: () => this.logout()
      }
    ];
    
    // Añadir opciones específicas según rol
    if (this.authService.isAdmin()) {
      this.userMenuItems = [
        { label: 'Panel de Administración', path: '/admin', icon: faTachometerAlt },
        ...baseMenuItems
      ];
    } else if (this.authService.isTeacher()) {
      this.userMenuItems = [
        { label: 'Panel de Profesor', path: '/teacher', icon: faChalkboardTeacher },
        ...baseMenuItems
      ];
    } else if (this.authService.isStudent()) {
      this.userMenuItems = [
        { label: 'Mi Aprendizaje', path: '/student', icon: faBookReader },
        ...baseMenuItems
      ];
    } else {
      this.userMenuItems = baseMenuItems;
    }
  }
  
  // Cerrar sesión
  logout(): void {
    this.authService.logout();
    this.toastService.info('Has cerrado sesión correctamente');
  }
  
  // Cerrar menús al hacer clic fuera
  private handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Verificar si el clic fue fuera del menú de usuario
    if (this.userMenuOpen && !target.closest('.user-menu') && !target.closest('button')) {
      this.userMenuOpen = false;
      this.cdr.detectChanges();
    }
  };
}