export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
  telefono?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
  usuario: UsuarioResponseDto;
}

export interface UsuarioResponseDto {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  fotoPerfil?: string;
  verificado: boolean;
  activo: boolean;
  ultimoAcceso?: Date;
  roles: RolDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RolDto {
  id: string;
  nombre: string;
  descripcion: string;
}