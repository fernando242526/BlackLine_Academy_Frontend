import { Categoria } from "./categoria.model";

export interface Subcategoria {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activo: boolean;
  orden: number;
  categoriaId: string;
  categoria?: Categoria;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubcategoriaDto {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  activo?: boolean;
  orden?: number;
  categoriaId: string;
}

export interface UpdateSubcategoriaDto {
  nombre?: string;
  descripcion?: string;
  imagen?: string;
  activo?: boolean;
  orden?: number;
  categoriaId?: string;
}

export interface FindSubcategoriasDto {
  nombre?: string;
  activo?: boolean;
  categoriaId?: string;
}