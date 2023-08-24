import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { DecimalPipe, NgFor } from '@angular/common';
import { AppProduct } from 'src/app/models/app-product';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [DecimalPipe, NgFor, FormsModule, NgbTypeaheadModule, NgbPaginationModule,RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {
  products: AppProduct[];
  page = 1;
  pageSize = 4;
  length = 0;
  constructor(private productService: ProductService) {
    this.refreshProducts();
    // this.productService.getAll().subscribe(products => {
    //   this.products = products;
    //   this.length = this.products.length;
     
    // });
  }

  refreshProducts() {
    this.productService.getAll().subscribe(products => {
      this.length = products.length;
      this.products = products.map((product, i) => ({ ...product })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
    });
  }

  ngOnDestroy() {

  }
  ngOnInit(): void {

  }


}
