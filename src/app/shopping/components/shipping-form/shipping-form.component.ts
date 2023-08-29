import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart:ShoppingCart;
  constructor(private router: Router, private authService: AuthService, private orderService: OrderService) {
    this.shipping = {
      name: null,
      addressLine1: null,
      addressLine2: null,
      city: null
    };
  }
  shipping: any;
  userId: string;
  //cart: ShoppingCart;
  userSubscription: Subscription;
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', (await result).key])
  }
}
