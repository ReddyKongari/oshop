import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product: any;
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories().valueChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getById(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    else {
      this.product = {
        title: null,
        category: null,
        price: null,
        imageUrl:null
      };
    }
  }
  ngOnInit(): void {
  }

  save(product: any) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
