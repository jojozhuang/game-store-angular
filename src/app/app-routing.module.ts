import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductAddComponent } from './productadd/productadd.component';
import { ProductListComponent } from './productlist/productlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'productadd', component: ProductAddComponent },
  { path: 'productadd/:id', component: ProductAddComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
