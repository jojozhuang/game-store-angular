import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../models';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private service: ProductService) {}
  products: Product[] = [];
  statusCode = 0;
  errmsg = '';

  ngOnInit() {
    this.getProducts();
  }
  //Fetch all products
  getProducts() {
    this.service.getProducts().subscribe(
      (data: Product[]) => (this.products = data),
      (error: any) => {
        this.statusCode = error.statusCode; // eslint-disable-line
        this.errmsg = error.message; // eslint-disable-line
      },
    );
  }

  deleteProduct(productId: number) {
    if (window.confirm('Are you sure to delete this product?')) {
      //console.log(event.id);
      this.service.deleteProductById(productId).subscribe(
        (successCode: number) => {
          this.statusCode = successCode;
          this.getProducts();
        },
        (error: any) => {
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    }
  }
}
