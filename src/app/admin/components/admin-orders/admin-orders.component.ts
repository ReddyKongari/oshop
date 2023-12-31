import { Component } from '@angular/core';
import { OrderService } from 'app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent   {
  orders$:any;
  constructor(orderService: OrderService) { 
    this.orders$ = orderService.getOrders();
  }
}
