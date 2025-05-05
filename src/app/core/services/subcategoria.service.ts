import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  Subcategoria, 
  CreateSubcategoriaDto, 
  FindSubcategoriasDto, 
  UpdateSubcategoriaDto 
} from '../models/subcategoria.model';
import { environment } from '../../../environments/environment';
import { PaginatedResponse, SelectItemDto } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/subcategorias`;

  /**
   * Crea una nueva subcategoría
   */
  create(createSubcategoriaDto: CreateSubcategoriaDto): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.apiUrl, createSubcategoriaDto);
  }

  /**
   * Obtiene una lista paginada de subcategorías con filtros opcionales
   */
  findAll(
    findSubcategoriasDto?: FindSubcategoriasDto, 
    page: number = 1, 
    limit: number = 10
  ): Observable<PaginatedResponse<Subcategoria>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (findSubcategoriasDto?.nombre) {
      params = params.set('nombre', findSubcategoriasDto.nombre);
    }

    if (findSubcategoriasDto?.activo !== undefined) {
      params = params.set('activo', findSubcategoriasDto.activo.toString());
    }

    if (findSubcategoriasDto?.categoriaId) {
      params = params.set('categoriaId', findSubcategoriasDto.categoriaId);
    }

    return this.http.get<PaginatedResponse<Subcategoria>>(this.apiUrl);
  }

  /**
   * Obtiene una lista simple de subcategorías para componentes select
   */
  findAllForSelect(categoriaId?: string): Observable<SelectItemDto[]> {
    let params = new HttpParams();
    
    if (categoriaId) {
      params = params.set('categoriaId', categoriaId);
    }
    
    return this.http.get<SelectItemDto[]>(`${this.apiUrl}/select`, { params });
  }

  /**
   * Obtiene una subcategoría por su ID
   */
  findOne(id: string): Observable<Subcategoria> {
    return this.http.get<Subcategoria>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualiza una subcategoría existente
   */
  update(id: string, updateSubcategoriaDto: UpdateSubcategoriaDto): Observable<Subcategoria> {
    return this.http.patch<Subcategoria>(`${this.apiUrl}/${id}`, updateSubcategoriaDto);
  }

  /**
   * Elimina una subcategoría
   */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}