import { Component, Input } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class ButtonComponent {
  @Input() disabled!: boolean;
  @Input() userName!: string;
  public clickButton(event: MouseEvent): void {
    if (this.disabled) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }
}
