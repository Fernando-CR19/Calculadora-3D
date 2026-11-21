import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  CadastroRequestDto,
  UsuarioResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from '../../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static readonly API_URL: string = environment.apiUrl;
  private static readonly TOKEN_KEY: string = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  authenticate(loginRequestDto: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http
      .post<LoginResponseDto>(`${AuthService.API_URL}/auth/login`, loginRequestDto)
      .pipe(
        tap((response) => {
          sessionStorage.setItem(AuthService.TOKEN_KEY, response.token);
        }),
      );
  }

  register(cadastroRequestDto: CadastroRequestDto): Observable<UsuarioResponseDto> {
    return this.http.post<UsuarioResponseDto>(
      `${AuthService.API_URL}/auth/cadastro`,
      cadastroRequestDto,
    );
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    return this.http.get(`${AuthService.API_URL}/usuarios/perfil`).pipe(
      map(() => true),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.removeToken();
        }
        return of(false);
      }),
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(AuthService.TOKEN_KEY);
  }

  removeToken(): void {
    sessionStorage.removeItem(AuthService.TOKEN_KEY);
  }
}
