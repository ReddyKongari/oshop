import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];

  category: string;
  constructor(
    route: ActivatedRoute,
    productService: ProductService) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category')
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
    });  
  }
}
