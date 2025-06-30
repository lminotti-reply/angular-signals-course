import {Component, computed, inject, signal} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {PokeService} from '../../services/poke/poke.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {finalize, take} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {CartService} from '../../services/cart/cart.service';
import {PokeIngredient} from '../../models';
import {ToastrService} from 'ngx-toastr';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {BowlNameSelectorComponent} from './components/bowl-name-selector/bowl-name-selector.component';

@Component({
  selector: 'app-cart',
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatToolbar,
    MatButton,
    CurrencyPipe,
    MatIconButton,
    MatIcon,
    MatProgressSpinner,
    BowlNameSelectorComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  protected readonly toastService = inject(ToastrService)
  protected readonly pokeService = inject(PokeService)
  protected readonly cartService = inject(CartService)

  // Equivalent to constructor-injection:
  // constructor (protected toastService: ToastrService, protected pokeService: PokeService, protected cartService: CartService) {}

  protected readonly loading = signal(false)

  /**
   * True iff the cart is empty
   */
  protected readonly cannotConfirm = computed(()=> this.loading() || !this.cartService.cart()?.ingredients.length );

  constructor() {

    this.loading.set(true)
    this.pokeService.loadPriceList()
      .pipe(
        finalize(()=> this.loading.set(false)),
        take(1)
      )
      .subscribe()
  }

  addIngredient(ingredient: PokeIngredient) {
    this.cartService.addIngredient(ingredient.id)
  }

  removeIngredient(ingredient: PokeIngredient) {
    this.cartService.removeIngredient(ingredient.id)
  }

  confirm() {
    this.loading.set(true)
    this.pokeService.sendOrder(this.cartService.cart())
      .pipe(
        finalize(()=> this.loading.set(false)),
        take(1)
      )
      .subscribe(()=>{
        this.toastService.success('Ordine inviato!');
        this.cartService.reset()
      })
  }
}
