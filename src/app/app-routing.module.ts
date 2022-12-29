import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './customer/cart/cart.component';
import { CustomerProductComponent } from './customer/customer-product/customer-product.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { Role } from './_model';

const routes: Routes = [
  {path: '', component: CustomerProductComponent},

  {path: 'cart', 
  component: CartComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.User]}},

  {path: 'findProductByCategoryId/:id',
  component: ProductComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin]}},

  {path: 'category',
  component: CategoryComponent,
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin]}},
  
  {
    path: 'login',
    component: LoginComponent
  },
  // {path: 'findProductByCategoryId/:id', component: ProductComponent},

  
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
