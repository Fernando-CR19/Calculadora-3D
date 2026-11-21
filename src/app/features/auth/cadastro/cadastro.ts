import { Component, signal } from '@angular/core';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
})
export class Cadastro {
  protected readonly anoAtual: number = new Date().getFullYear();

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
    console.log('Payload enviado');
  }
}
