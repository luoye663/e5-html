import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {StorageService} from '../service/storage.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {


  constructor(private storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('拦截器......');
    console.log(req);
    const token = this.storage.get('token');
    const httpRequest = req.clone({
      // url: 'https://api.e5.qyi.io' + req.url
      url: 'http://127.0.0.1:8081' + req.url,
      setHeaders: {token: token}
    });
    return next.handle(httpRequest);
  }
}
