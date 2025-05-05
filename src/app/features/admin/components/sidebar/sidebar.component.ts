import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faTachometerAlt, 
  faLayerGroup, 
  faFolderTree, 
  faGraduationCap, 
  faChalkboardTeacher, 
  faUsers, 
  faCog, 
  faSignOutAlt,
  faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  label: string;
  route?: string;
  icon: any;
  expanded?: boolean;
  active?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private router = inject(Router);
  isSidebarCollapsed = signal<boolean>(false);
  
  menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      route: '/admin/dashboard',
      icon: faTachometerAlt,
      active: this.isRouteActive('/admin/dashboard')
    },
    {
      label: 'Categorías',
      icon: faLayerGroup,
      expanded: false,
      active: this.isRouteActive('/admin/categorias'),
      children: [
        {
          label: 'Todas las categorías',
          route: '/admin/categorias',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/categorias')
        },
        {
          label: 'Nueva categoría',
          route: '/admin/categorias/nueva',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/categorias/nueva')
        }
      ]
    },
    {
      label: 'Subcategorías',
      icon: faFolderTree,
      expanded: false,
      active: this.isRouteActive('/admin/subcategorias'),
      children: [
        {
          label: 'Todas las subcategorías',
          route: '/admin/subcategorias',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/subcategorias')
        },
        {
          label: 'Nueva subcategoría',
          route: '/admin/subcategorias/nueva',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/subcategorias/nueva')
        }
      ]
    },
    {
      label: 'Cursos',
      icon: faGraduationCap,
      expanded: false,
      active: this.isRouteActive('/admin/cursos'),
      children: [
        {
          label: 'Todos los cursos',
          route: '/admin/cursos',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/cursos')
        },
        {
          label: 'Nuevo curso',
          route: '/admin/cursos/nuevo',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/cursos/nuevo')
        }
      ]
    },
    {
      label: 'Profesores',
      icon: faChalkboardTeacher,
      expanded: false,
      active: this.isRouteActive('/admin/profesores'),
      children: [
        {
          label: 'Todos los profesores',
          route: '/admin/profesores',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/profesores')
        },
        {
          label: 'Nuevo profesor',
          route: '/admin/profesores/nuevo',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/profesores/nuevo')
        }
      ]
    },
    {
      label: 'Estudiantes',
      icon: faUsers,
      expanded: false,
      active: this.isRouteActive('/admin/estudiantes'),
      children: [
        {
          label: 'Todos los estudiantes',
          route: '/admin/estudiantes',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/estudiantes')
        },
        {
          label: 'Nuevo estudiante',
          route: '/admin/estudiantes/nuevo',
          icon: faChevronRight,
          active: this.isRouteActive('/admin/estudiantes/nuevo')
        }
      ]
    },
    {
      label: 'Configuración',
      route: '/admin/configuracion',
      icon: faCog,
      active: this.isRouteActive('/admin/configuracion')
    },
  ]);

  // Iconos para usar en el template
  faChevronDown = faChevronDown;
  faSignOutAlt = faSignOutAlt;

  toggleSidebar(): void {
    this.isSidebarCollapsed.update(value => !value);
  }

  toggleMenuItem(index: number): void {
    const items = this.menuItems();
    const updatedItems = [...items];
    updatedItems[index].expanded = !updatedItems[index].expanded;
    this.menuItems.set(updatedItems);
  }

  navigateTo(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    // Implementar la lógica de cierre de sesión
    console.log('Cerrando sesión...');
    // Redireccionar a la página de login
    this.router.navigate(['/auth/login']);
  }
}