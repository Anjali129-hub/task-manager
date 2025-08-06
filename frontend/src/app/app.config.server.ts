import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const config = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // <-- Important: add withFetch here!
      // if you have interceptors
      // withInterceptors([authInterceptor])
    ),
    importProvidersFrom(ReactiveFormsModule, FormsModule),
  ],
};
