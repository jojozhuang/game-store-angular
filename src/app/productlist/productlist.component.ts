import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private service: ProductService) {}
  products;
  statusCode: number;
  errmsg: string;

  ngOnInit() {
    this.getProducts();
  }
  //Fetch all products
  getProducts() {
    this.service.getProducts().subscribe(
      (data) => (this.products = data),
      (error) => {
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
        (error) => {
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    }
  }
}
