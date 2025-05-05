import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFolderTree,
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
  faSync,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

import { debounceTime } from 'rxjs';
import { SubcategoriaService } from '../../../../core/services/subcategoria.service';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Subcategoria } from '../../../../core/models/subcategoria.model';
import { PaginatedResponse, SelectItemDto } from '../../../../core/models/categoria.model';

@Component({
  selector: 'app-lista-subcategorias',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './lista-subcategorias.component.html',
  styleUrl: './lista-subcategorias.component.scss'
})
export default class ListaSubcategoriasComponent implements OnInit {
  private subcategoriaService = inject(SubcategoriaService);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  
  // Iconos
  faFolderTree = faFolderTree;
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
  subcategorias = signal<Subcategoria[]>([]);
  categorias = signal<SelectItemDto[]>([]);
  categoriasLoading = signal<boolean>(false);
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
  subcategoriaAEliminar = signal<Subcategoria | null>(null);
  
  ngOnInit(): void {
    this.initFiltrosForm();
    this.cargarCategorias();
    this.cargarSubcategorias();
    
    // Suscribirse a cambios en el formulario para aplicar filtros automáticamente
    this.filtrosForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.currentPage.set(1);
        this.cargarSubcategorias();
      });
  }
  
  initFiltrosForm(): void {
    this.filtrosForm = this.fb.group({
      nombre: [''],
      categoriaId: [''],
      activo: [null]
    });
  }
  
  cargarCategorias(): void {
    this.categoriasLoading.set(true);
    
    this.categoriaService.findAllForSelect().subscribe({
      next: (data) => {
        this.categorias.set(data);
      },
      error: (err) => {
        this.toastService.error(
          'Error al cargar categorías', 
          err.error?.message || 'No se pudieron cargar las categorías'
        );
      },
      complete: () => {
        this.categoriasLoading.set(false);
      }
    });
  }
  
  cargarSubcategorias(): void {
    this.isLoading.set(true);
    
    const filtros = {
      nombre: this.filtrosForm.get('nombre')?.value || undefined,
      categoriaId: this.filtrosForm.get('categoriaId')?.value || undefined,
      activo: this.filtrosForm.get('activo')?.value !== null ? 
              this.filtrosForm.get('activo')?.value : undefined
    };
    
    this.subcategoriaService.findAll(
      filtros,
      this.currentPage(),
      this.itemsPerPage()
    ).subscribe({
      next: (response: PaginatedResponse<Subcategoria>) => {
        this.subcategorias.set(response.items);
        this.totalItems.set(response.meta.totalItems);
        this.totalPages.set(response.meta.totalPages);
      },
      error: (err) => {
        this.toastService.error(
          'Error al cargar subcategorías', 
          err.error?.message || 'No se pudieron cargar las subcategorías'
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
    this.cargarSubcategorias();
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
      categoriaId: '',
      activo: null
    });
  }
  
  cambiarEstadoSubcategoria(subcategoria: Subcategoria): void {
    const nuevoEstado = !subcategoria.activo;
    
    this.subcategoriaService.update(subcategoria.id, { activo: nuevoEstado }).subscribe({
      next: () => {
        // Actualizar la subcategoría localmente
        this.subcategorias.update(items => 
          items.map(item => item.id === subcategoria.id ? {...item, activo: nuevoEstado} : item)
        );
        
        this.toastService.success(
          `Subcategoría ${nuevoEstado ? 'activada' : 'desactivada'}`, 
          `La subcategoría "${subcategoria.nombre}" ha sido ${nuevoEstado ? 'activada' : 'desactivada'} correctamente`
        );
      },
      error: (err) => {
        this.toastService.error(
          'Error al cambiar estado', 
          err.error?.message || 'No se pudo cambiar el estado de la subcategoría'
        );
      }
    });
  }
  
  confirmarEliminar(subcategoria: Subcategoria): void {
    this.subcategoriaAEliminar.set(subcategoria);
    this.mostrarModal.set(true);
  }
  
  cancelarEliminar(): void {
    this.mostrarModal.set(false);
    this.subcategoriaAEliminar.set(null);
  }
  
  eliminarSubcategoria(): void {
    if (!this.subcategoriaAEliminar()) return;
    
    const subcategoria = this.subcategoriaAEliminar()!;
    
    this.subcategoriaService.remove(subcategoria.id).subscribe({
      next: () => {
        // Eliminar la subcategoría localmente
        this.subcategorias.update(items => items.filter(item => item.id !== subcategoria.id));
        this.totalItems.update(count => count - 1);
        
        // Recalcular total de páginas
        const totalPages = Math.ceil(this.totalItems() / this.itemsPerPage());
        this.totalPages.set(totalPages);
        
        // Si la página actual ya no existe, ir a la última
        if (this.currentPage() > totalPages) {
          this.currentPage.set(totalPages || 1);
        }
        
        this.toastService.success(
          'Subcategoría eliminada', 
          `La subcategoría "${subcategoria.nombre}" ha sido eliminada correctamente`
        );
        
        // Cerrar modal
        this.mostrarModal.set(false);
        this.subcategoriaAEliminar.set(null);
      },
      error: (err) => {
        this.toastService.error(
          'Error al eliminar', 
          err.error?.message || 'No se pudo eliminar la subcategoría'
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
  
  // Obtener el nombre de la categoría por ID
  getCategoriaName(categoriaId: string): string {
    const categoria = this.categorias().find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  }
}