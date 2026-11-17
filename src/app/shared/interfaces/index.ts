export interface LoginRequestDto {
  nomeUsuario: string;
  senha: string;
}

export interface LoginResponseDto {
  token: string;
}
