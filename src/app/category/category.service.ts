import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { baseAPI } from '../baseAPI/baseAPI';
import { Category } from '../Interface/category.interface';
import { Product } from '../Interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = baseAPI.apiBaseUrl;

  constructor(private http:HttpClient) { }
  product = new BehaviorSubject<Product[]>([]);
  category = new BehaviorSubject<Category[]>([]);

  public getCategories():void {
    this.http.get<Category[]>('http://localhost:8090/categories').pipe(first()).subscribe(category => this.category.next(category));
  }
  
  public getProductsbyCatId(id): void{
    this.http.get<Product[]>('http://localhost:8090/findProductByCategoryId/'+id).pipe(first()).subscribe(product => this.product.next(product));
  }

  public deleteCategory(id):Observable<Category[]>{
    return this.http.delete<Category[]>(this.apiServerUrl+'/category/'+id);
  }

  public addCategory(formData:FormData):Observable<FormData>{
    console.log(formData,"HI")
    return this.http.post<FormData>(this.apiServerUrl+"/categories",formData)
  }
  public updateCategory(formData:FormData):Observable<FormData>{
    console.log(formData,"HI")
    return this.http.put<FormData>(this.apiServerUrl+"/categories",formData)
  }

}
