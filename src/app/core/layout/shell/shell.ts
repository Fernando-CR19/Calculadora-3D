import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matMenuOutline,
  matLightModeOutline,
  matAccountCircleOutline,
} from '@ng-icons/material-symbols/outline';

@Component({
  imports: [RouterOutlet, NgIcon],
  selector: 'app-shell',
  templateUrl: './shell.html',
  providers: [provideIcons({ matMenuOutline, matLightModeOutline, matAccountCircleOutline })],
})
export class Shell {}
