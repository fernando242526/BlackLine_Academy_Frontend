import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFolderTree,
  faSave,
  faTimes,
  faExclamationTriangle,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, forkJoin, of, switchMap, tap } from 'rxjs';
import { SubcategoriaService } from '../../../../../core/services/subcategoria.service';
import { CategoriaService } from '../../../../../core/services/categoria.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { Subcategoria } from '../../../../../core/models/subcategoria.model';
import { SelectItemDto } from '../../../../../core/models/categoria.model';

@Component({
  selector: 'app-form-subcategoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './form-subcategoria.component.html',
  styleUrl: './form-subcategoria.component.scss',
})
export default class FormSubcategoriaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subcategoriaService = inject(SubcategoriaService);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);

  // Iconos
  faFolderTree = faFolderTree;
  faLayerGroup = faLayerGroup;
  faSave = faSave;
  faTimes = faTimes;
  faExclamationTriangle = faExclamationTriangle;

  // Estado del componente
  isEditMode = signal<boolean>(false);
  subcategoriaId = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  categoriasLoading = signal<boolean>(false);
  categorias = signal<SelectItemDto[]>([]);

  subcategoriaForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadCategorias();
    this.checkEditMode();
  }

  initForm(): void {
    this.subcategoriaForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      categoriaId: ['', [Validators.required]],
      activo: [true],
      orden: [0, [Validators.min(0), Validators.max(9999)]],
    });
  }

  loadCategorias(): void {
    this.categoriasLoading.set(true);
    
    this.categoriaService.findAllForSelect()
      .pipe(
        tap((categorias) => {
          this.categorias.set(categorias);
        }),
        catchError(err => {
          this.error.set('Error al cargar las categorías');
          this.toastService.error(
            'Error',
            'No se pudieron cargar las categorías disponibles'
          );
          return of([]);
        }),
        finalize(() => this.categoriasLoading.set(false))
      )
      .subscribe();
  }

  checkEditMode(): void {
    // Verifica si la ruta tiene un parámetro id, lo que indica modo edición
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode.set(true);
      this.subcategoriaId.set(idParam);
      this.loadSubcategoriaData(idParam);
    }
  }

  loadSubcategoriaData(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.subcategoriaService
      .findOne(id)
      .pipe(
        tap((subcategoria: Subcategoria) => {
          this.subcategoriaForm.patchValue({
            nombre: subcategoria.nombre,
            descripcion: subcategoria.descripcion,
            categoriaId: subcategoria.categoriaId,
            activo: subcategoria.activo,
            orden: subcategoria.orden,
          });
        }),
        catchError((err) => {
          this.error.set(
            err.error?.message || 'Error al cargar los datos de la subcategoría'
          );
          this.toastService.error(
            'Error al cargar la subcategoría',
            err.error?.message ||
              'No se pudo obtener la información de la subcategoría'
          );
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  get nombre() {
    return this.subcategoriaForm.get('nombre');
  }
  
  get descripcion() {
    return this.subcategoriaForm.get('descripcion');
  }
  
  get categoriaId() {
    return this.subcategoriaForm.get('categoriaId');
  }
  
  get orden() {
    return this.subcategoriaForm.get('orden');
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.subcategoriaForm.get(controlName);
    return (
      !!control &&
      control.hasError(errorName) &&
      (control.dirty || control.touched)
    );
  }

  onSubmit(): void {
    if (this.subcategoriaForm.invalid) {
      this.subcategoriaForm.markAllAsTouched();
      this.toastService.warning(
        'Formulario incompleto',
        'Por favor completa correctamente todos los campos requeridos'
      );
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    const subcategoriaData = this.subcategoriaForm.value;

    if (this.isEditMode() && this.subcategoriaId()) {
      // Actualizando una subcategoría existente
      this.subcategoriaService
        .update(this.subcategoriaId()!, subcategoriaData)
        .pipe(
          tap((subcategoria) => {
            this.toastService.success(
              'Subcategoría actualizada',
              `La subcategoría "${subcategoria.nombre}" ha sido actualizada correctamente`
            );
            this.router.navigate(['/admin/subcategorias']);
          }),
          catchError((err) => {
            const errorMsg =
              err.error?.message || 'Error al actualizar la subcategoría';
            this.error.set(errorMsg);
            this.toastService.error('Error al actualizar', errorMsg);
            return of(null);
          }),
          finalize(() => this.isSubmitting.set(false))
        )
        .subscribe();
    } else {
      // Creando una nueva subcategoría
      this.subcategoriaService
        .create(subcategoriaData)
        .pipe(
          tap((subcategoria) => {
            this.toastService.success(
              'Subcategoría creada',
              `La subcategoría "${subcategoria.nombre}" ha sido creada correctamente`
            );
            this.router.navigate(['/admin/subcategorias']);
          }),
          catchError((err) => {
            const errorMsg =
              err.error?.message || 'Error al crear la subcategoría';
            this.error.set(errorMsg);
            this.toastService.error('Error al crear', errorMsg);
            return of(null);
          }),
          finalize(() => this.isSubmitting.set(false))
        )
        .subscribe();
    }
  }

  cancelar(): void {
    this.router.navigate(['/admin/subcategorias']);
    this.toastService.info(
      'Operación cancelada',
      'No se han guardado los cambios'
    );
  }
}