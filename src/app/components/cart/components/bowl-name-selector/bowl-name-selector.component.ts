import {Component, effect, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bowl-name-selector',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './bowl-name-selector.component.html',
  styleUrl: './bowl-name-selector.component.css'
})
export class BowlNameSelectorComponent {
  protected readonly userService = inject(UserService);

  // Definizione campo nome della bowl
  bowlNameCtrl = new FormControl('');

  constructor() {
    // Sincronizza il campo nome della bowl con il nome del cliente
    effect(() => {
      this.bowlNameCtrl.setValue(this.userService.customerName());
    });
  }
}
