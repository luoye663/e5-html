import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from './service/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'e5-html';
    loginTitle: string;
    isLogin = false;

    constructor(private router: Router, private storage: StorageService) {
        if (!this.storage.isLogin()) {
            this.loginTitle = '登录';
            this.isLogin = false;
        } else {
            this.loginTitle = '退出';
            this.isLogin = true;
        }
    }

    gotoLogin(): void {
        // window.location.href = '/login';
        if (!this.isLogin) {
            this.router.navigateByUrl('/login');
        } else {
            this.storage.signOut();
            this.router.navigateByUrl('/login');
            console.log('点击了退出');
        }
    }
}
