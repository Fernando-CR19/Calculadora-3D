import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matMenuOutline,
  matLightModeOutline,
  matAccountCircleOutline,
  matCloseOutline,
} from '@ng-icons/material-symbols/outline';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [
    RouterOutlet,
    NgIcon,
    CdkMenu,
    CdkMenuItem,
    CdkMenuTrigger,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-shell',
  templateUrl: './shell.html',
  providers: [
    provideIcons({ matMenuOutline, matLightModeOutline, matAccountCircleOutline, matCloseOutline }),
  ],
  host: {
    '(document:keydown.escape)': 'closeMenuAndRestoreFocus()',
  },
})
export class Shell {
  protected readonly isMenuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  protected toggleMenuState(): void {
    this.isMenuOpen.update((state) => !state);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected closeMenuAndRestoreFocus(): void {
    if (!this.isMenuOpen()) return;

    this.closeMenu();
    this.menuButton()?.nativeElement.focus();
  }

  protected logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
