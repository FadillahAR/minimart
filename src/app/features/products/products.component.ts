import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../core/model/Product';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchForm: FormGroup;
  productForm: FormGroup; 
  selectedProduct: Product | null = null; 

  constructor(private productService: ProductsService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: ['']
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products; 
    });
  }

  search() {
    const term = this.searchForm.get('searchTerm')?.value;
    this.productService.getProducts().subscribe(data => {
      this.products = data.products.filter((product: Product) => 
        product.name.toLowerCase().includes(term.toLowerCase())
      ); 
    });
  }

  addOrEditProduct() {
    if (this.selectedProduct) {
      this.productService.editProduct(this.selectedProduct.id, this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.productForm.patchValue(product); 
  }

  resetForm() {
    this.productForm.reset();
    this.selectedProduct = null;
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
