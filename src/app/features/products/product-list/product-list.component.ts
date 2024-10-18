import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../../core/model/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  isDetailView: boolean = false;

  constructor(private productService: ProductsService, private router: Router) { }

  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts();
      });
    }
  }

  goToDetail(productId: number): void {
    this.isDetailView = true; 
    this.router.navigate(['/products/detail', productId]);
  }

  filteredProducts(): Product[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
