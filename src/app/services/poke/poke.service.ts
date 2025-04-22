import {computed, inject, Injectable, signal} from '@angular/core';
import {PokeCart, PokeIngredient, PokePriceList} from '../../models';
import {tap} from 'rxjs';
import {HttpClientFakeService} from '../mock/http-client-fake.service';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private httpClient = inject(HttpClientFakeService); // just a mock of HttpClient

  /**
   * Price list internal data structure
   * @private
   */
  private _priceList = signal<PokePriceList | undefined>(undefined);

  /**
   * Base poke price
   */
  public basePrice = computed(()=> this._priceList()?.basePrice)

  /**
   * Ingredients data
   */
  public ingredientsData = computed(()=>this._priceList()?.ingredients);

  /**
   * Ingredient data by id
   */
  public ingredientsDataById = computed(() =>
    this.ingredientsData()?.reduce((acc, ingredient) => ({
      ...acc,
      [ingredient.id]: ingredient
    }), {} as Record<number, PokeIngredient>));

  /**
   * Load pricing list
   */
  public loadPriceList() {
    // Simulate an API call to fetch ingredients
    return this.httpClient.get<PokePriceList>('/api/ingredients').pipe(
        // we update the internal data structure with a price list
        tap(data=> this._priceList.set(data)),
      )
  }

  /**
   * Send order to the server
   */
  public sendOrder(pokeCart: PokeCart) {
    return this.httpClient.post('/api/order', pokeCart)
  }
}
