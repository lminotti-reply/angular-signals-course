import {computed, inject, Injectable, signal} from '@angular/core';
import {PokeCart, PokeCartIngredient} from '../../models';
import {PokeService} from '../poke/poke.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  protected pokeService = inject(PokeService);

  /**
   * Cart internal data structure
   * @private
   */
  private _cart = signal<PokeCart>({ingredients: [], bowlName: ''});

  /**
   * Cart data
   */
  public cart = this._cart.asReadonly();

  /**
   * Cart data as map
   */
  public cartIngredientsById = computed(() =>
    this.cart().ingredients.reduce((acc, ingredient) =>
      ({...acc, [ingredient.id]: ingredient}), {} as Record<number, PokeCartIngredient|undefined>)
  )

  /**
   * Total price of the cart
   */
  public cartPrice = computed(()=>{
    const basePrice = this.pokeService.basePrice();
    const ingredientsPrices = this.pokeService.ingredientsDataById()

    if(!ingredientsPrices || !basePrice){
      return undefined; // Total price is undefined if a price list is not available
    }else {
      const ingredientsPrice = this._cart().ingredients.reduce((total, ingredient) => {
        return total + (ingredient.quantity * ingredientsPrices[ingredient.id].price);
      }, 0);
      return basePrice + ingredientsPrice;
    }
  })


  /**
   * True iff the cart is full (4 ingredients)
   */
  public cartFull = computed(()=> {
    return (this.cart()?.ingredients??[])
      .map(ingredient=>ingredient.quantity)
      .reduce((acc, n)=>acc+n, 0)>= 4
  });

  /**
   * Cart reset
   */
  public reset() {
    this._cart.update(cart => ({...cart,ingredients: []}));
  }

  /**
   * Add an ingredient to the cart. Max 4 ingredients
   */

  public addIngredient(ingredientId:number) {
    this._cart.update(cart => {
      const nextCart = {...cart, ingredients: [...cart.ingredients]};

      if (cart.ingredients.length < 4) {
        const existingIngredient = nextCart.ingredients.find(ingredient => ingredient.id === ingredientId);
        if (existingIngredient) {
          existingIngredient.quantity++;
        } else {
          nextCart.ingredients.push({id: ingredientId, quantity: 1});
        }
      }
      return nextCart;
    })
  }

  /**
   * Remove an ingredient from the cart
   */
  public removeIngredient(ingredientId:number) {
    this._cart.update(cart => {
      const nextCart = {...cart, ingredients: [...cart.ingredients]};

      const existingIngredient = cart.ingredients.find(ingredient => ingredient.id === ingredientId);
      if (existingIngredient) {
        if (existingIngredient.quantity > 1) {
          existingIngredient.quantity--;
        } else {
          nextCart.ingredients = cart.ingredients.filter(ingredient => ingredient.id !== ingredientId);
        }
      }
      return nextCart;
    })
  }

  /**
   * Set the bowl name
   */
  setBowlName(bowlName: string) {
    this._cart.update(cart => ({...cart, bowlName}));
  }
}
