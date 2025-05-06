import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  Categoria, 
  CreateCategoriaDto, 
  FindCategoriasDto, 
  PaginatedResponse, 
  SelectItemDto, 
  UpdateCategoriaDto 
} from '../models/categoria.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  /**
   * Crea una nueva categoría
   */
  create(createCategoriaDto: CreateCategoriaDto): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, createCategoriaDto);
  }

  /**
   * Obtiene una lista paginada de categorías con filtros opcionales
   */
  findAll(
    findCategoriasDto?: FindCategoriasDto, 
    page: number = 1, 
    limit: number = 10
  ): Observable<PaginatedResponse<Categoria>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (findCategoriasDto?.nombre) {
      params = params.set('nombre', findCategoriasDto.nombre);
    }

    if (findCategoriasDto?.activo !== undefined) {
      params = params.set('activo', findCategoriasDto.activo.toString());
    }

    return this.http.get<PaginatedResponse<Categoria>>(this.apiUrl, { params });
  }

  /**
   * Obtiene una lista simple de categorías para componentes select
   */
  findAllForSelect(): Observable<SelectItemDto[]> {
    return this.http.get<SelectItemDto[]>(`${this.apiUrl}/select`);
  }

  /**
   * Obtiene una categoría por su ID
   */
  findOne(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  /**
   * Actualiza una categoría existente
   */
  update(id: string, updateCategoriaDto: UpdateCategoriaDto): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.apiUrl}/${id}`, updateCategoriaDto);
  }

  /**
   * Elimina una categoría
   */
  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}