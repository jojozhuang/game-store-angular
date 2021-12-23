import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ProductService } from './product.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductAddComponent } from './productadd/productadd.component';
import { ProductListComponent } from './productlist/productlist.component';
import { ErrorInterceptorProvider } from './http.interceptor';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'productadd', component: ProductAddComponent },
  { path: 'productadd/:id', component: ProductAddComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductAddComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    AlertModule.forRoot(),
  ],
  providers: [ProductService, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
