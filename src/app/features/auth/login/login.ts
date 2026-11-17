import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDefaultResponse } from '../../../shared/interfaces';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  protected readonly anoAtual = new Date().getFullYear();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  private readonly loginModel = signal({
    nomeUsuario: '',
    senha: '',
  });

  protected readonly loginForm = form(this.loginModel, (path) => {
    required(path.nomeUsuario, { message: 'Nome de usuário é obrigatório.' });
    required(path.senha, { message: 'Senha é obrigatória.' });
  });

  protected onSubmit() {
    if (this.loginForm().valid()) {
      const payload = this.loginModel();
      this.authService.authenticate(payload).subscribe({
        next: () => {
          this.router.navigate(['/app']);
        },
        error: (errorResponse: HttpErrorResponse) => {
          const apiError: ErrorDefaultResponse = errorResponse.error;
          console.log('Erro ao fazer o login: ', apiError);
        },
      });
    }
  }
}
