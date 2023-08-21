import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: any;
  constructor(private productService: ProductService) {
    // this.productService.getAll().valueChanges().subscribe(data => {
    //   this.products$ = data;
    //   console.log(this.products$);
    // });
    this.productService.getAll().subscribe(data=>{
      this.products$=data;
    });
    //console.log(this.products$);
  }

  ngOnInit(): void {
  }

}
