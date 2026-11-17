import { Component, signal, WritableSignal } from '@angular/core';
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
  protected readonly anoAtual: number = new Date().getFullYear();
  protected readonly errorMessage: WritableSignal<string> = signal('');

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
      this.errorMessage.set('');

      const payload = this.loginModel();
      this.authService.authenticate(payload).subscribe({
        next: () => {
          this.router.navigate(['/app']);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 0 || errorResponse.error instanceof Error) {
            this.errorMessage.set(
              'Não foi possível estabelecer uma conexão com o servidor. Tente novamente mais tarde.',
            );
            return;
          }

          const apiError: ErrorDefaultResponse = errorResponse.error;
          const message = apiError?.message || 'Erro inesperado ao fazer login.';
          this.errorMessage.set(message);
        },
      });
    }
  }
}
