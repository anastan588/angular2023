import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled!: boolean;
  @Input() userName!: string;
  public proxyClick(event: MouseEvent): void {
    if (this.disabled) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }
}
