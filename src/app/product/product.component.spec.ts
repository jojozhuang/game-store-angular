import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductService } from '../product.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
    declarations: [ProductComponent],
    imports: [ReactiveFormsModule, RouterTestingModule],
    providers: [ProductService, provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
