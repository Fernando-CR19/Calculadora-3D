import { Component, input } from '@angular/core';
import { IconType, NgIcon } from '@ng-icons/core';

@Component({
  selector: 'button[app-icon-button]',
  template: '<ng-icon [name]="icon()" size="28"/>',
  host: {
    class:
      'cursor-pointer flex items-center p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand',
    type: 'button',
    '[attr.aria-label]': 'ariaLabel()',
  },
  imports: [NgIcon],
})
export class IconButton {
  readonly icon = input.required<IconType>();
  readonly ariaLabel = input.required<string>({ alias: 'aria-label' });
}
