import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';


export const appConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
};
