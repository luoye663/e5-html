import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Route, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    isSpin = true;
    errorText = '';

    constructor(public route: ActivatedRoute, public router: Router, public http: HttpClientService, private notification: NzNotificationService) {
        route.queryParams.subscribe(value => {
            console.log('登录', value);
            this.errorText = value.errorText;
            if (value.errorText != null) {
                this.createNotification('error', value.errorText);
            }
        });
        http.get('/auth2/getGithubUrl', {}, value => {
            console.log(value);
            this.isSpin = false;
        });
        // console.log('http返回请求', ht);
    }

    ngOnInit(): void {
    }

    goGithub(): void {
        const navigationExtras: NavigationExtras = {
            queryParams: {tokenc: 'ok'}
        };
        this.router.navigate(['https://github.com'], navigationExtras);
    }

    createNotification(type: string, msg: string): void {
        this.notification.create(
            type,
            '信息',
            msg,
            {nzDuration: 6 * 1000}
        );
    }
}
