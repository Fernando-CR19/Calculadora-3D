interface ErrorDetail {
  property: string;
  message: string;
}

export interface ErrorDefaultResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors: ErrorDetail[];
}

export interface LoginRequestDto {
  nomeUsuario: string;
  senha: string;
}

export interface LoginResponseDto {
  token: string;
}

export interface CadastroRequestDto {
  nome: string;
  nomeUsuario: string;
  senha: string;
}

export interface UsuarioResponseDto {
  uuid: string;
  nome: string;
  nomeUsuario: string;
}
