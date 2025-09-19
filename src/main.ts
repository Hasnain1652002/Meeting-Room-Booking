import { bootstrapApplication } from '@angular/platform-browser';
import { App,appRoutes} from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes), // 👈 connect routes here
    provideHttpClient() 
  ]
});