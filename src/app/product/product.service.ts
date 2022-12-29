import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseAPI } from '../baseAPI/baseAPI';
import { Product } from '../Interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = baseAPI.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getCategories():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiServerUrl+'/categories');
  }
  
  public deleteProduct(id):Observable<Product[]>{
    return this.http.delete<Product[]>(this.apiServerUrl+'/products/'+id);
  }

  public addProduct(formData:FormData):Observable<FormData>{
    console.log(formData,"HI")
    return this.http.post<FormData>(this.apiServerUrl+"/products",formData)
  }
  public updateProduct(formData:FormData):Observable<FormData>{
    console.log(formData,"HI")
    return this.http.put<FormData>(this.apiServerUrl+"/products",formData)
  }
}
