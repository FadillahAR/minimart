import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  template: `
    <button mat-raised-button color="warn" (click)="goBack()">Back</button>
    <div *ngIf="product">
      <h2>{{ product.title }}</h2>
      <p><strong>Price:</strong> {{ product.price | currency }}</p>
      <p><strong>Description:</strong> {{ product.description }}</p>
      <img [src]="product.imageUrl" alt="{{ product.title }}" />
    </div>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
  `,
  styles: [`
    h2 {
      color: #0078D4;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(productId);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
        this.loading = false;
      },
      err => {
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/products/list']); 
  }
}
