import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Pastikan import ini benar


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
