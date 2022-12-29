import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { baseAPI } from '../baseAPI/baseAPI';
import { Cart } from '../Interface/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart[] | null>;
  public cart: Observable<Cart[] | null>;
  count = new BehaviorSubject<number>(0);

  constructor(private router: Router,
    private http: HttpClient) {

      this.cartSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('shoppingCart')!));
        this.cart = this.cartSubject.asObservable();
   }
   public get cartValue() {
    // console.log(this.userSubject.value)
      return this.cartValue.value;
    }

    public getCartByUserId(id:number){
      console.log(id)
      return this.http.get<Cart[]>(`${baseAPI.apiBaseUrl}/shoppingCart/${id}`)
        .pipe(map(cart => {
          console.log(cart)
          console.log("HELLO")
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            this.cartSubject.next(cart);
            // return cart;
        }));
    }
    public addCart(carts:any){
      return this.http.post<any>(`${baseAPI.apiBaseUrl}/shoppingCart`,carts)
    }
    // public updateCart(carts:any){
    //   return this.http.put<any>(`${baseAPI.apiBaseUrl}/shoppingCart`,carts)
    // }
    public deleteCart(id:number,carts:any){
      return this.http.delete<any>(`${baseAPI.apiBaseUrl}/shoppingCart/${id}`,carts)
    }
}

