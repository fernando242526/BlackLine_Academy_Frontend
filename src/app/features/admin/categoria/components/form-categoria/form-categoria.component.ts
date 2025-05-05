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
  faLayerGroup,
  faSave,
  faTimes,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { CategoriaService } from '../../../../../core/services/categoria.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { Categoria } from '../../../../../core/models/categoria.model';

@Component({
  selector: 'app-form-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './form-categoria.component.html',
  styleUrl: './form-categoria.component.scss',
})
export default class FormCategoriaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);

  // Iconos
  faLayerGroup = faLayerGroup;
  faSave = faSave;
  faTimes = faTimes;
  faExclamationTriangle = faExclamationTriangle;

  // Estado del componente
  isEditMode = signal<boolean>(false);
  categoriaId = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  categoriaForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.categoriaForm = this.fb.group({
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
      activo: [true],
      orden: [0, [Validators.min(0), Validators.max(9999)]],
    });
  }

  checkEditMode(): void {
    // Verifica si la ruta tiene un parámetro id, lo que indica modo edición
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode.set(true);
      this.categoriaId.set(idParam);
      this.loadCategoriaData(idParam);
    }
  }

  loadCategoriaData(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.categoriaService
      .findOne(id)
      .pipe(
        tap((categoria: Categoria) => {
          this.categoriaForm.patchValue({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion,
            activo: categoria.activo,
            orden: categoria.orden,
          });
        }),
        catchError((err) => {
          this.error.set(
            err.error?.message || 'Error al cargar los datos de la categoría'
          );
          this.toastService.error(
            'Error al cargar la categoría',
            err.error?.message ||
              'No se pudo obtener la información de la categoría'
          );
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  get nombre() {
    return this.categoriaForm.get('nombre');
  }
  get descripcion() {
    return this.categoriaForm.get('descripcion');
  }
  get orden() {
    return this.categoriaForm.get('orden');
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.categoriaForm.get(controlName);
    return (
      !!control &&
      control.hasError(errorName) &&
      (control.dirty || control.touched)
    );
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      this.toastService.warning(
        'Formulario incompleto',
        'Por favor completa correctamente todos los campos requeridos'
      );
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    const categoriaData = this.categoriaForm.value;

    if (this.isEditMode() && this.categoriaId()) {
      // Actualizando una categoría existente
      this.categoriaService
        .update(this.categoriaId()!, categoriaData)
        .pipe(
          tap((categoria) => {
            this.toastService.success(
              'Categoría actualizada',
              `La categoría "${categoria.nombre}" ha sido actualizada correctamente`
            );
            this.router.navigate(['/admin/categorias']);
          }),
          catchError((err) => {
            const errorMsg =
              err.error?.message || 'Error al actualizar la categoría';
            this.error.set(errorMsg);
            this.toastService.error('Error al actualizar', errorMsg);
            return of(null);
          }),
          finalize(() => this.isSubmitting.set(false))
        )
        .subscribe();
    } else {
      // Creando una nueva categoría
      this.categoriaService
        .create(categoriaData)
        .pipe(
          tap((categoria) => {
            this.toastService.success(
              'Categoría creada',
              `La categoría "${categoria.nombre}" ha sido creada correctamente`
            );
            this.router.navigate(['/admin/categorias']);
          }),
          catchError((err) => {
            const errorMsg =
              err.error?.message || 'Error al crear la categoría';
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
    this.router.navigate(['/admin/categorias']);
    this.toastService.info(
      'Operación cancelada',
      'No se han guardado los cambios'
    );
  }
}