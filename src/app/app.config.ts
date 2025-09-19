// app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter,Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),  // empty for now (no routing yet)
    provideHttpClient(),
    importProvidersFrom(FormsModule)  // enables [(ngModel)] in forms
  ]
};

