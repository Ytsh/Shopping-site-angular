import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/Interface/cart.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  userId: number;
  cartItems: Cart[];
  cartCounterItems: Cart[];
  cartCount: number = 0;
  totalPrice: number = 0;

  constructor(private readonly cartService: CartService, 
    private readonly route: ActivatedRoute,
    private dialog: MatDialog,) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('user_id');
    if(id)
    {
      this.userId = +id;
    }

    this.getCartByUserId(this.userId);

    setTimeout(() => {
      this.calCount();
    }, 100);

    
  }

  // openDialog() {
  //   this.dialog.open(OrderDialogComponent, {
  //     width: '70%'
  //   }).afterClosed().subscribe(val => {
  //     if(val == 'save') {
  //       alert("ok");
  //     }
  //   }); 
  // } 

  getCartByUserId(userId): void {
    this.cartService.getCartByUserId(userId)
      .subscribe({
        next: (response) => {
          this.cartItems = response;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        } 
      });
  }

  deleteCartItem(cartId): void {
    if (confirm("Do you want to delete!") == true) {
      this.cartService
      .deleteCart(cartId).subscribe({
        next: () => {
          this.getCartByUserId(this.userId);
          setTimeout(() => {
            this.calCount();
          }, 100);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      });
    }    
  }

  calCount(): void {
    this.cartItems.map((cartItem) => {
      this.cartCount += cartItem.quantity;
      // this.totalPrice += cartItem.product.price * cartItem.quantity;
    });
  }

}
