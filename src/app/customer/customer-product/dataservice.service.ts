import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/Interface/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  // cart:Cart[] = [];

  private dataSub = new BehaviorSubject<Cart[]>([]);
  currentData  = this.dataSub.asObservable();
  constructor() {}
  public updateProduct(formData:FormData):Observable<FormData>{
    console.log(formData,"HI")
    
    return this.http.put<FormData>(this.apiServerUrl+"/products",formData)
  }
}