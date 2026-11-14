import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  loginModel = signal({
    nomeUsuario: '',
    senha: '',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.nomeUsuario, { message: 'Nome de usuário é obrigatório.' });
    required(path.senha, { message: 'Senha é obrigatória.' });
  });

  onSubmit() {
    if (this.loginForm().valid()) {
      const payload = this.loginModel();
      console.log('payload enviado: ', payload);
    }
  }
}
