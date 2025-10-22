import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: false
})
export class ProductComponent implements OnInit {
  private readonly service = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  statusCode = 0;
  errmsg = '';
  filename = '';
  id = '';
  selectedFile: File;

  //Create form
  productForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
    productName: new UntypedFormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    price: new UntypedFormControl(
      '0',
      Validators.compose([Validators.required, Validators.min(0), Validators.max(2147483647)]),
    ),
    image: new UntypedFormControl(this.service.baseUrl + 'images/default.png'),
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    //console.log(this.id);
    if (this.id) {
      this.service.getProductById(Number(this.id)).subscribe(
        (product: Product) => {
          this.productForm.setValue({
            id: product.id,
            productName: product.productName,
            price: product.price,
            image: product.image,
          });
        },
        (error: any) => { // eslint-disable-line
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    }
  }

  //Handle create and update product
  onClickSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    const product = this.productForm.value as Product;
    if (!product.id) {
      //Create product
      product.id = 0;
      this.service.createProduct(product).subscribe(
        (successCode: number) => {
          this.statusCode = successCode;
          void this.router.navigate(['products']);
        },
        (error: any) => { // eslint-disable-line
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    } else {
      //Update product
      this.service.updateProduct(product).subscribe(
        (successCode: number) => {
          this.statusCode = successCode;
          void this.router.navigate(['products']);
        },
        (error: any) => { // eslint-disable-line
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    }
  }

  //Image upload
  @ViewChild('fileInput') fileInput: any; // eslint-disable-line
  @ViewChild('productImage') productImage: any; // eslint-disable-line

  filechanged(event: any): void { // eslint-disable-line
    this.selectedFile = event.target.files[0]; // eslint-disable-line
    this.filename = this.selectedFile.name;
  }

  upload(): void {
    if (this.selectedFile) {
      this.service.upload(this.selectedFile).subscribe(
        (res: any) => { // eslint-disable-line
          this.productForm.patchValue({ image: res.message }); // eslint-disable-line
          this.productImage.src = res.message; // eslint-disable-line
        },
        (error: any) => { // eslint-disable-line
          this.statusCode = error.statusCode; // eslint-disable-line
          this.errmsg = error.message; // eslint-disable-line
        },
      );
    }
  }
}
