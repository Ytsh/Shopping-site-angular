import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { baseAPI } from '../baseAPI/baseAPI';
import { Cart } from '../Interface/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiServerUrl = baseAPI.apiBaseUrl;

  count = new BehaviorSubject<number>(0);

  constructor(private readonly http: HttpClient) { }

  public addCart(cart: Cart): Observable<Cart>
  {
    return this.http.post<Cart>(`${this.apiServerUrl}/shoppingCart`, cart);
  } 

  public getCartByUserId(userId: number): Observable<Cart[]>
  {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/shoppingCart/${userId}`);
  }

  public deleteCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/shoppingCart/${cartId}`);
  }

  public getCartCount(userId: number): void {
    this.http.get<number>(`${this.apiServerUrl}/cart/count/${userId}`).pipe(first()).subscribe(count => this.count.next(count));
  }

  public setCartCount(count: number): void {
    localStorage.setItem("cart_count", JSON.stringify(count));
    this.count.next(count);
  }
}
