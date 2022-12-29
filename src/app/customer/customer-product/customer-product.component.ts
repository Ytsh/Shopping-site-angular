import { isDataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import { Cart } from 'src/app/Interface/cart.interface';
import { Category } from 'src/app/Interface/category.interface';
import { Product } from 'src/app/Interface/product.interface';
import { ProductService } from 'src/app/product/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/_model';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.scss']
})
export class CustomerProductComponent {

  categoryId: number;
  // childCategories: Category[];
  products: Product[] = [];
  category: Category[];
  carts:Cart[];
  cart:Cart = {} as Cart;
  user:User
  btnbool:boolean;
  private subscription: Subscription;
  cartCount: number;
  
  constructor(private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly router: Router,
    private cartService:CartService,
    private authService:AuthService ) {}

  ngOnInit(): void {
    this.btnbool = false
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.categoryId = +id;
    }
    // this.subscription = this.cartService.cart.subscribe(val => this.carts = val);
    this.subscription = this.authService.user.subscribe(val => this.user = val);

    this.categoryService.getCategories();
    this.categoryService.category.subscribe({
      next: (response) => {
        this.category = response;
      }
    });
    // console.log(this.category);
    // setTimeout(() => {
    //   this.getChildCategories(this.categoryId);
    // },1000);
  }
  isRoleAvailable(R:string):boolean
  {

    if(this.user.roles == R)
    {
      return true;
    }
    else{
      return false;
    }
  }
  
  addtocart(quantity,product):void{


    this.cartService.getCartByUserId(this.user.id)
    .subscribe({
      next:(response)=>{
        this.carts = response
        console.log("respnse",response)
      }
    })
    setTimeout(() => {
      console.log("product",product)

      console.log("thiscarts",this.carts)
  
    //   const ids = this.carts.find(item=>item.product.id===product.id)
    //   console.log("ids",ids)


    // if( ids )
    // {
    //   console.log("HOLA")
    //   this.cart.id = ids.id
    //   this.cart.quantity = quantity
    //   this.cart.userId = this.user.id 
    //   this.cart.product = product
    //   // this.cartService.addCart(this.cart)
    // }
    // else{
    //   console.log("HI",quantity,product)
      this.cart.quantity = quantity
      this.cart.userId = this.user.id 
      this.cart.product = product
      // this.cartService.addCart(this.cart)
    // }
    console.log("thiscart",this.cart)

      // console.log(this.cart);
      // this.cartService.addCart(this.cart)
      //   .subscribe({
      //     next: () => {
      //       this.cartService.getCartByUserId(this.user.id)
      //       // .subscribe({
      //       //   next: (response) => {
      //       //       console.log("resp",response)
      //       //       setTimeout(() => {
      //       //       console.log("resp",response)
      //       //     }, 100);
      //       //     response.map((cartItem) => {
      //       //       this.cartCount += cartItem.quantity;
      //       //       this.cartService.setCartCount(this.cartCount);
      //       //     });
      //       //   },
      //       //   error: (err: HttpErrorResponse) => {
      //       //     alert(err.message);
      //       //   } 
      //       // });
      //     },
      //     error: (err: HttpErrorResponse) => {
      //       alert(err.message);
      //     }
      //   });
    }, 100);

    }
    


    

  // getChildCategories(categoryId: number): void {

  //   this.categoryService.getChildCategories(categoryId);
  //   this.categoryService.categories.subscribe({
  //     next: (response) => {
  //       this.childCategories = response;
  //       // console.log(this.childCategories);
  //       this.childCategories.forEach((element) => {
  //         // console.log(element);
  //         setTimeout(() => {
  //           this.productService.getProductByCategory(element.id);

  //           this.productService.product.subscribe({
  //             next: (res) => {
  //               this.products = res;
                
  //             }
  //           });
  //         });
  //       });
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       alert(err.message);
  //     }
  //   })
  // }

  getProductByCategory(childCategoryId: number): void {
    // this.categoryService.getCategoryById(childCategoryId);
    // this.categoryService.getChildCategories(childCategoryId);
    // this.productService.getProductByCategory(childCategoryId);
       
    this.router.navigate(['/products', childCategoryId]).then();
  }

}
