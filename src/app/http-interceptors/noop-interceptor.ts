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
        const tokens = this.storage.get('token');
        let httpRequest;
        if (tokens) {
            httpRequest = req.clone({
                // url: 'https://api.e5.qyi.io' + req.url
                url: 'https://127.0.0.1:8081' + req.url,
                setHeaders: {token: tokens}
            });
        } else {
            httpRequest = req.clone({
                // url: 'https://api.e5.qyi.io' + req.url
                url: 'http://127.0.0.1:8081' + req.url
            });
        }
        return next.handle(httpRequest);
        /*return next.handle(httpRequest).pipe(tap(
            event => {
                if (event instanceof HttpResponse) {
                    if (event.body.code !== 0) {
                        this.msg.createNotification('error', event.body.msg);
                        return;
                    }
                }
            },
            e => {
                switch (e.status) {
                    case 403:
                        this.msg.createNotification('error', '当前登录用户无权限,请检查会话是否过期!');
                        break;
                    case 500:
                        this.msg.createNotification('error', '服务端出错啦......请联系管理员。');
                        break;
                    default:
                        this.msg.createNotification('error', '请求服务端异常,请稍后重试!');
                }
            }
        ));*/
    }
}
