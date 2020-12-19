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
    loginUrl = '';

    constructor(public route: ActivatedRoute, public router: Router,
                public http: HttpClientService, private notification: NzNotificationService) {
        route.queryParams.subscribe(value => {
            this.errorText = value.errorText;
            if (value.errorText != null) {
                this.createNotification('error', value.errorText);
            }
        });
        http.get('/auth2/getGithubUrl', {}, value => {
            this.loginUrl = value.data;
            this.isSpin = false;
        });
        // console.log('http返回请求', ht);
    }

    ngOnInit(): void {
    }

    goGithub(): void {
        window.location.href = this.loginUrl;
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
