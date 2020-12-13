import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    configUrl = 'assets/config.json';

    constructor(private http: HttpClient, private msg: MessageService) {
    }

    getConfig(): any {
        return this.http.get(this.configUrl);
    }

    get(url, options, cb?: (value) => any): any {
        /*if (options) {
            options = {};
        }*/
        return this.http.get(url, options).subscribe((value: any) => {
            if (value.code !== 0) {
                this.msg.createNotification('error', value.msg);
                return;
            }
            if (cb) {
                cb(value);
            }
        }, e => {
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
        });
    }

    post(url, body, cb?: (value) => any): any {
        return this.http.post(url, body).subscribe((value: any) => {
            if (value.code !== 0) {
                this.msg.createNotification('error', value.msg);
                return;
            }
            if (cb) {
                cb(value);
            }
        }, e => {
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
        });
    }
}
