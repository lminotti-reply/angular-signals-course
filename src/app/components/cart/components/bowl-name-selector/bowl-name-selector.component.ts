import {Component, effect, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CartService} from '../../../../services/cart/cart.service';

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
  // Servizio che gestisce il carrello
  protected readonly cartService = inject(CartService);

  // Servizio che gestisce le informazioni dell'utente
  protected readonly userService = inject(UserService);

  // Definizione campo nome della bowl
  bowlNameCtrl = new FormControl('');

  constructor() {
    // Sincronizza il campo nome della bowl con il nome del cliente
    effect(() => {
      const customerName = this.userService.customerName()
      this.bowlNameCtrl.setValue(customerName);
    });

    // Memorizza il nome della bowl nel servizio CartService
    this.bowlNameCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.cartService.setBowlName(value ?? '');
    });
  }

}
