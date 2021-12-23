import { TestBed, inject } from "@angular/core/testing";

import { ProductService } from "./product.service";

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
