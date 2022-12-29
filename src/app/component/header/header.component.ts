import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/Interface/category.interface';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/_model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLoggedIn: User;
  
  private subscription: Subscription;
  
  constructor(private authService: AuthService, private readonly http: HttpClient, private readonly categoryService:CategoryService,
    private readonly router: Router,) { 
      
     }

  category:Category[];
  username:string = "";

  ngOnInit(): void {
    // this.getuserdetail()
    this.subscription = this.authService.user.subscribe(val => this.isLoggedIn = val);
  


    this.categoryService.getCategories()
    this.categoryService.category.subscribe({
      next: response => {
        // this.category = response.map()
        this.category = response;
        console.log(response);
      }
    });
  }
  isRoleAvailable(R:string):boolean
  {

    if(this.isLoggedIn.roles == R)
    {
      return true;
    }
    else{
      return false;
    }
  }

  // getuserdetail(){
  //   const user = this.authService.userValue;
  //   // user.username
  //   this.username = user?.username
  //   if(user?.accessToken){
  //     this.isLoggedIn = true
  //   }
  //   else{
  //     this.isLoggedIn = false
  //   }
  // }
  categoryCRUD(){
    this.categoryService.getCategories;
    this.router.navigate(['/category']).then();
  }

  findProductByCategoryId(id)
  {
    
    this.categoryService.getProductsbyCatId(id);
    this.router.navigate(['/findProductByCategoryId', id]).then();
  }

  login(): void {
    // this.getuserdetail()
    this.router.navigate(['/login'])
   }
   backhome(){
    this.router.navigate(['/'])
   }
 
   logout(): void {
    //  this.getuserdetail()
     this.authService.logout()
    //  this.authService.isLoggedIn$$.next(false);
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
