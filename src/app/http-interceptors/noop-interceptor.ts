import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {StorageService} from '../service/storage.service';
import {tap} from 'rxjs/operators';
import {MessageService} from '../service/message.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {


    constructor(private storage: StorageService, private msg: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.get('token');
        const httpRequest = req.clone({
            // url: 'https://api.e5.qyi.io' + req.url
            url: 'http://127.0.0.1:8081' + req.url,
            setHeaders: {token: token}
        });
        return next.handle(httpRequest).pipe(tap(
            event => {
                if (event instanceof HttpResponse) {
                    if (event.status !== 200) {
                        this.msg.createNotification('error', '请求服务端异常');
                        return;
                    }
                    if (event.body.code !== 0) {
                        this.msg.createNotification('error', event.body.msg);
                        return;
                    }
                }
            }
        ));
    }
}
