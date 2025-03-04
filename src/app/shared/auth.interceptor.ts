import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.currentAccessToken) {
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `${authService.currentAccessToken?.token_type} ${authService.currentAccessToken?.access_token}`
      ),
    });
    return next(authReq);
  }
  return next(req);
};
