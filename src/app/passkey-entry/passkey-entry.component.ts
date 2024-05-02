import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FunctionCodeService } from "../function-code.service";

@Component({
  selector: 'app-passkey-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './passkey-entry.component.html',
  styleUrl: './passkey-entry.component.scss',
  host: { class: 'flex' }
})
export class PasskeyEntryComponent {
  private readonly functionCodeService = inject(FunctionCodeService);

  @Output() functionCodeChange = new EventEmitter<string>();

  passKey: string | null = null;

  onSubmitPasskey() {
    if (this.passKey != null) {
      this.functionCodeService.fetchFunctionCode(this.passKey).subscribe(code => {
        this.functionCodeChange.emit(code);
      });
    }
  }
}
