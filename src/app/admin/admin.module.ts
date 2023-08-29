import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModule } from 'shared/shared.module';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
 
  imports: [   
    SharedModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  declarations: [
    ProductFormComponent,
    //AdminProductsComponent,
    AdminOrdersComponent
  ],
})
export class AdminModule { }
