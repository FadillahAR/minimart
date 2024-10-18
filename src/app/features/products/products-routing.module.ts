import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      { path: 'list', component: ProductListComponent }, 
      { path: 'add', component: ProductAddComponent },   
      { path: 'edit/:id', component: ProductEditComponent }, 
      { path: 'detail/:id', component: ProductDetailComponent }, 
      { path: '', redirectTo: 'list', pathMatch: 'full' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
