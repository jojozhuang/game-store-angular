import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseResult } from './models';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>, // eslint-disable-line
    next: HttpHandler,
  ): Observable<HttpEvent<any>> { // eslint-disable-line
    return next.handle(req).pipe(
      tap(
        (event) => {}, // eslint-disable-line
        (response) => {
          const respResult = new ResponseResult(200, '');
          if (response instanceof HttpErrorResponse) {
            const err = response.message || JSON.stringify(response.error);
            respResult.statusCode = response.status;
            respResult.message = `${response.statusText || ''} Details: ${err}`;
          } else {
            respResult.statusCode = 400;
            respResult.message = response.message ? response.message : response.toString(); // eslint-disable-line
          }
          return respResult;
        },
      ),
    );
  }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHttpInterceptor,
  multi: true,
};
