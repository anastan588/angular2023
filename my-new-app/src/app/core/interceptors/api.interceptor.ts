import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  ApiKey: string;
  url: string;
  constructor() {
    this.ApiKey = 'AIzaSyDw22f9N_kytrYdmAh5pNfWDm0IKWUwKIw';
    this.url = 'https://www.googleapis.com/youtube/v3/';
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: `${this.url}${request.url}`,
        setParams: {
          key: this.ApiKey,
        },
      })
    );
  }
}
