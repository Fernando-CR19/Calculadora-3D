import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matMenuOutline,
  matLightModeOutline,
  matAccountCircleOutline,
} from '@ng-icons/material-symbols/outline';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [RouterOutlet, NgIcon, CdkMenu, CdkMenuItem, CdkMenuTrigger],
  selector: 'app-shell',
  templateUrl: './shell.html',
  providers: [provideIcons({ matMenuOutline, matLightModeOutline, matAccountCircleOutline })],
})
export class Shell {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  protected logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
