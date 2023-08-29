import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories: any;
  @Input('category') category: string;
  constructor(categoryService: CategoryService) {    
    categoryService.getAll().subscribe((response) => {
      this.categories = response;
    });
  }

  ngOnInit(): void {
  }

}
