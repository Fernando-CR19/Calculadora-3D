import { Component, signal } from '@angular/core';
import { form, FormField, required, validate } from '@angular/forms/signals';
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
