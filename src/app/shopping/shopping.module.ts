import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import ShoppingCartSummaryComponent from './components/shopping-cart-summary/shopping-cart-summary.component';
import {  RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';



@NgModule({
  imports: [
    SharedModule,     
    RouterModule
  ],
  declarations: [
    MyOrdersComponent,  
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ] 
})
export class ShoppingModule { }
