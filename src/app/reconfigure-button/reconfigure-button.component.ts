import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reconfigure-button',
  standalone: true,
  imports: [],
  templateUrl: './reconfigure-button.component.html',
})
export class ReconfigureButtonComponent {
  @Output() reconfigureClicked = new EventEmitter<void>();

  onReconfigure() {
    this.reconfigureClicked.emit();
  }
}
