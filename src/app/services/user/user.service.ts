import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Track customer name
  private _customerName = signal<string>('Luca');
  public readonly customerName = this._customerName.asReadonly();

  public setName(name: string) {
    if(this._customerName()!== name)
      this._customerName.set(name);
  }
}
