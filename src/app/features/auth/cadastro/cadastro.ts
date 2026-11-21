import { Component, computed, signal, WritableSignal } from '@angular/core';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDefaultResponse } from '../../../shared/interfaces';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  protected readonly anoAtual: number = new Date().getFullYear();
  protected readonly errorMessage: WritableSignal<string> = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  private readonly cadastroModel = signal({
    nome: '',
    nomeUsuario: '',
    senha: '',
    confirmarSenha: '',
  });

  protected readonly cadastroForm = form(this.cadastroModel, (path) => {
    required(path.nome, { message: 'Nome é obrigatório.' });
    required(path.nomeUsuario, { message: 'Nome de usuário é obrigatório.' });
    required(path.senha, { message: 'Senha é obrigatória.' });
    required(path.confirmarSenha, { message: 'Por favor, confirme sua senha.' });

    minLength(path.nome, 2, { message: 'O nome deve ter no mínimo 2 caracteres.' });
    maxLength(path.nome, 100, { message: 'O nome deve ter no máximo 100 caracteres.' });

    pattern(path.nomeUsuario, /^[a-zA-Z0-9.\-_]{3,20}$/, {
      message:
        'O nome de usuário deve ter entre 3 e 20 caracteres e conter apenas letras, números, hífen, ponto ou underline.',
    });

    minLength(path.senha, 8, { message: 'A senha deve ter no mínimo 8 caracteres.' });
    maxLength(path.senha, 72, { message: 'A senha deve ter no máximo 72 caracteres.' });

    validate(path.confirmarSenha, ({ value, valueOf }) => {
      const confirmarSenha = value();
      const senha = valueOf(path.senha);

      if (!confirmarSenha) {
        return null;
      }

      if (confirmarSenha !== senha) {
        return {
          kind: 'passwordsMismatch',
          message: 'As senhas devem ser iguais.',
        };
      }

      return null;
    });
  });

  protected onSubmit() {
    if (this.cadastroForm().valid()) {
      this.errorMessage.set('');

      const { confirmarSenha, ...payload } = this.cadastroModel();
      this.authService.register(payload).subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            state: { successMessage: 'Cadastro realizado com sucesso, pode fazer o login.' },
          });
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 0 || errorResponse.error instanceof Error) {
            this.errorMessage.set(
              'Não foi possível estabelecer uma conexão com o servidor. Tente novamente mais tarde.',
            );
            return;
          }

          const apiError: ErrorDefaultResponse = errorResponse.error;
          const message = apiError?.message || 'Erro inesperado ao fazer o cadastro.';
          this.errorMessage.set(message);
        },
      });
    }
  }
}
