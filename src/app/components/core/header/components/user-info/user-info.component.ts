import {Component, effect, inject} from '@angular/core';
import {UserService} from '../../../../../services/user/user.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-user-info',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  protected readonly userService = inject(UserService);
  // Definizione campo nome del cliente
  myNameCtrl = new FormControl('')

  constructor() {
    // Sincronizzazione del campo nome del cliente con il servizio UserService
    effect(() => {
      this.myNameCtrl.setValue(this.userService.customerName(), {emitEvent: false});
    });
    this.myNameCtrl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      this.userService.setName(value ?? '');
    })
  }
}
