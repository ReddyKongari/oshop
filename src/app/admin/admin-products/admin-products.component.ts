import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
 import { Subscription } from 'rxjs';
 import { AppProduct } from 'src/app/models/app-product';
 import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
// export class AdminProductsComponent implements OnInit {
//   products$: any;
//   constructor(private productService: ProductService) {
//     // this.productService.getAll().valueChanges().subscribe(data => {
//     //   this.products$ = data;
//     //   console.log(this.products$);
//     // });
//     this.productService.getAll().subscribe(data=>{
//       this.products$=data;
//     });
//     //console.log(this.products$);
//   }

//   ngOnInit(): void {
//   }

// }
export class AdminProductsComponent implements OnInit {
  products: AppProduct[];
  filteredProducts: any[];
  subscription: Subscription;
 
  items: AppProduct[];
  itemCount: number;

  public columns:Array<any> = [
    {title: 'Title', name: 'name', filtering: {filterString: '', placeholder: 'Filter by title'}},   
    {title: 'Price ($)', name: 'price'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {    
      this.filteredProducts = this.products = products;
      console.log(this.products);
      //this.initializeTable(products);
    });
  }
  // private initializeTable(products: AppProduct[]) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);
  //   this.tableResource.count().then(count => this.itemCount = count);
  // }
  // reloadItems(params: any) {
  //   if (!this.tableResource) return;
  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }
  // filter(query: string) {
  //   this.filteredProducts = (query) ?
  //     this.products.filter(p => p.title.includes(query)) : this.products;
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
  }
}
