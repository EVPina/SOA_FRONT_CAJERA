import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('✅ App iniciada correctamente'))
  .catch((err) => console.error('❌ Error al iniciar:', err));