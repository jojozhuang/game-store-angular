import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductService } from '../product.service';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    declarations: [ProductsComponent],
    imports: [],
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
