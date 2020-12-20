import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Route, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {MessageService} from '../service/message.service';
import {NzModalService} from 'ng-zorro-antd/modal';

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
                public http: HttpClientService, private notification: NzNotificationService, private modal: NzModalService) {
        route.queryParams.subscribe(value => {
            this.errorText = value.errorText;
            if (value.errorText != null) {
                this.createNotification('error', value.errorText);
            }
        });
        http.get('/auth2/getGithubUrl', {}, value => {
            this.loginUrl = value.data;
            this.isSpin = false;
            setTimeout(() => {
                this.modal.create({
                    nzTitle: '温馨提示',
                    nzContent: '客官,我看你停留在此页面挺久了，是不是不知道怎么登录？点击 屏幕中间 的小猫猫头像进行登录。',
                    nzClosable: false
                });
            }, 10000);
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
