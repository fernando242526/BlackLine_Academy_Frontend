export interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activo: boolean;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoriaDto {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activo?: boolean;
  orden?: number;
}

export interface UpdateCategoriaDto {
  nombre?: string;
  descripcion?: string;
  imagen?: string;
  activo?: boolean;
  orden?: number;
}

export interface FindCategoriasDto {
  nombre?: string;
  activo?: boolean;
}

export interface SelectItemDto {
  id: string;
  nombre: string;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}