import {Injectable} from '@angular/core';
import {map, Observable, timer} from 'rxjs';
import {PokeCart} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HttpClientFakeService {

  constructor() { }

  public get<T>(url: string): Observable<T> {
    if(url === '/api/ingredients') {
      return  timer(1000)
        .pipe(
          map(()=>{
            return {
              basePrice: 10.5,
              ingredients: [
                {id: 1, name: 'Tuna', price: 3.5},
                {id: 2, name: 'Salmon', price: 3.5},
                {id: 3, name: 'Edamame', price: 1.5},
              ]
            } as T;
          })
        )
    }else {
      throw new Error('Unknown URL');
    }
  }

  post(s: string, priceList: PokeCart) {
    if(s === '/api/order') {
      return timer(1000)
    }else {
      throw new Error('Unknown URL');
    }
  }
}
