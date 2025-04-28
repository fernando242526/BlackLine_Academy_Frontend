import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  
  // Iconos
  protected faBars = faBars;
  protected faTimes = faTimes;
  protected faUser = faUser;
  protected faSignInAlt = faSignInAlt;
  
  // Estado de menú móvil
  isMenuOpen = false;
  scrolled = false;
  
  // Información de autenticación
  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;
  
  // Rutas del menú principal
  menuItems = [
    { path: '/', label: 'INICIO', exact: true },
    { path: '/nosotros', label: 'SOBRE BLACKLINE', exact: false },
    { path: '/cursos', label: 'FORMACIONES', exact: false },
    { path: '/modalidades', label: 'MÉTODO BLACKLINE', exact: false },
    { path: '/recursos', label: 'BIBLIOTECA', exact: false },
    { path: '/certificaciones', label: 'CERTIFICACIONES', exact: false },
    { path: '/contactanos', label: 'CONTÁCTANOS', exact: false }
  ];
  
  // Detectar scroll para cambiar estilo del navbar
  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }
  
  // Alternar menú móvil
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Bloquear scroll del body cuando el menú está abierto
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Cerrar menú
  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
  
  // Cerrar sesión
  logout() {
    this.authService.logout();
    this.closeMenu();
  }
}