import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLayerGroup,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faEye,
  faEyeSlash,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faFilter,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Categoria, FindCategoriasDto, PaginatedResponse } from '../../../../core/models/categoria.model';

@Component({
  selector: 'app-lista-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.scss'
})
export default class ListaCategoriasComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  
  // Iconos
  faLayerGroup = faLayerGroup;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faFilter = faFilter;
  faSync = faSync;
  
  // Estado de la vista
  isLoading = signal<boolean>(false);
  categorias = signal<Categoria[]>([]);
  filtrosVisibles = signal<boolean>(false);
  
  // Paginación
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  
  // Formulario de filtros
  filtrosForm!: FormGroup;
  
  // Modal de confirmación
  mostrarModal = signal<boolean>(false);
  categoriaAEliminar = signal<Categoria | null>(null);
  
  ngOnInit(): void {
    this.initFiltrosForm();
    this.cargarCategorias();
    
    // Suscribirse a cambios en el formulario para aplicar filtros automáticamente
    this.filtrosForm.valueChanges
      .pipe(debounceTime(500)) // Esperar 500ms después del último cambio
      .subscribe(() => {
        this.currentPage.set(1); // Reset a primera página al cambiar filtros
        this.cargarCategorias();
      });
  }
  
  initFiltrosForm(): void {
    this.filtrosForm = this.fb.group({
      nombre: [''],
      activo: [null] // null = todos, true = activos, false = inactivos
    });
  }
  
  cargarCategorias(): void {
    this.isLoading.set(true);
    
    const filtros: FindCategoriasDto = {
      nombre: this.filtrosForm.get('nombre')?.value || undefined,
      activo: this.filtrosForm.get('activo')?.value !== null ? 
              this.filtrosForm.get('activo')?.value : undefined
    };
    
    this.categoriaService.findAll(
      filtros,
      this.currentPage(),
      this.itemsPerPage()
    ).subscribe({
      next: (response: PaginatedResponse<Categoria>) => {
        this.categorias.set(response.items);
        this.totalItems.set(response.meta.totalItems);
        this.totalPages.set(response.meta.totalPages);
      },
      error: (err) => {
        this.toastService.error(
          'Error al cargar categorías', 
          err.error?.message || 'No se pudieron cargar las categorías'
        );
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
  
  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPages()) return;
    
    this.currentPage.set(pagina);
    this.cargarCategorias();
  }
  
  irAPrimeraPagina(): void {
    this.cambiarPagina(1);
  }
  
  irAUltimaPagina(): void {
    this.cambiarPagina(this.totalPages());
  }
  
  toggleFiltros(): void {
    this.filtrosVisibles.update(value => !value);
  }
  
  resetFiltros(): void {
    this.filtrosForm.reset({
      nombre: '',
      activo: null
    });
    // La carga se dispara automáticamente por el valueChanges
  }
  
  cambiarEstadoCategoria(categoria: Categoria): void {
    const nuevoEstado = !categoria.activo;
    
    this.categoriaService.update(categoria.id, { activo: nuevoEstado }).subscribe({
      next: () => {
        // Actualizar la categoría localmente
        this.categorias.update(cats => 
          cats.map(c => c.id === categoria.id ? {...c, activo: nuevoEstado} : c)
        );
        
        this.toastService.success(
          `Categoría ${nuevoEstado ? 'activada' : 'desactivada'}`, 
          `La categoría "${categoria.nombre}" ha sido ${nuevoEstado ? 'activada' : 'desactivada'} correctamente`
        );
      },
      error: (err) => {
        this.toastService.error(
          'Error al cambiar estado', 
          err.error?.message || 'No se pudo cambiar el estado de la categoría'
        );
      }
    });
  }
  
  confirmarEliminar(categoria: Categoria): void {
    this.categoriaAEliminar.set(categoria);
    this.mostrarModal.set(true);
  }
  
  cancelarEliminar(): void {
    this.mostrarModal.set(false);
    this.categoriaAEliminar.set(null);
  }
  
  eliminarCategoria(): void {
    if (!this.categoriaAEliminar()) return;
    
    const categoria = this.categoriaAEliminar()!;
    
    this.categoriaService.remove(categoria.id).subscribe({
      next: () => {
        // Eliminar la categoría localmente
        this.categorias.update(cats => cats.filter(c => c.id !== categoria.id));
        this.totalItems.update(count => count - 1);
        
        // Recalcular total de páginas
        const totalPages = Math.ceil(this.totalItems() / this.itemsPerPage());
        this.totalPages.set(totalPages);
        
        // Si la página actual ya no existe, ir a la última
        if (this.currentPage() > totalPages) {
          this.currentPage.set(totalPages || 1);
        }
        
        this.toastService.success(
          'Categoría eliminada', 
          `La categoría "${categoria.nombre}" ha sido eliminada correctamente`
        );
        
        // Cerrar modal
        this.mostrarModal.set(false);
        this.categoriaAEliminar.set(null);
      },
      error: (err) => {
        this.toastService.error(
          'Error al eliminar', 
          err.error?.message || 'No se pudo eliminar la categoría'
        );
      }
    });
  }
  
  // Utilidades para paginación
  getPaginas(): number[] {
    const total = this.totalPages();
    const actual = this.currentPage();
    const pages: number[] = [];
    
    // Si hay 7 o menos páginas, mostrar todas
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Siempre mostrar la primera página
    pages.push(1);
    
    // Determinar las páginas intermedias
    if (actual <= 4) {
      // Cerca del inicio
      pages.push(2, 3, 4, 5);
    } else if (actual >= total - 3) {
      // Cerca del final
      pages.push(total - 4, total - 3, total - 2, total - 1);
    } else {
      // En el medio
      pages.push(actual - 2, actual - 1, actual, actual + 1);
    }
    
    // Siempre mostrar la última página
    pages.push(total);
    
    return pages;
  }
}