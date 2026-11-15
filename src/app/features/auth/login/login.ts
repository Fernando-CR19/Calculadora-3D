import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  protected readonly anoAtual = new Date().getFullYear();

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
      console.log('payload enviado: ', payload);
    }
  }
}
