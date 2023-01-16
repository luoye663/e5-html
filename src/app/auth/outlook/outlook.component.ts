import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {DatePipe} from '@angular/common';
import {StorageService} from '../../service/storage.service';

@Component({
    selector: 'app-outlook',
    templateUrl: './outlook.component.html',
    styleUrls: ['./outlook.component.less']
})
export class OutlookComponent implements OnInit {
    info = {status: '', title: '', subTitle: ''};
    subInfo = {code: '', state: '', error: ''};
    isSpinShow = true;

    constructor(private route: ActivatedRoute, private http: HttpClientService, datePipe: DatePipe, storage: StorageService) {
        route.queryParams.subscribe(value => {
            console.log(value);
            this.subInfo.code = value.code;
            this.subInfo.state = value.state;
            this.subInfo.error = value.error_description;
        });
        /*授权失败!*/
        if (this.subInfo.error !== undefined) {
            this.info.status = 'error';
            this.info.title = '授权失败';
            this.info.subTitle = this.subInfo.error;
            this.closeSpin();
            return;
        }
        /*缺少参数*/
        if (this.subInfo.code == null || this.subInfo.state == null || this.subInfo.code.length < 1 || this.subInfo.state.length < 1) {
            this.info.status = 'error';
            this.info.title = '缺少参数';
            this.info.subTitle = '从微软返回的信息中缺少 code 或 state 参数!';
            this.closeSpin();
            return;
        }
        const data = {
            code: this.subInfo.code,
            state: this.subInfo.state
        };
        const userId = this.route.snapshot.params.userId;
        console.log('userid:', userId);
        http.get('/outlook/auth2/' + userId + '/receive', {params: data}, value => {
            console.log(value);
            this.info.status = 'success';
            this.info.title = '授权成功!';
            this.closeSpin();
        }, msg => {
            this.info.status = 'error';
            this.info.title = '授权失败';
            this.info.subTitle = msg;
            this.closeSpin();
        });
    }

    ngOnInit(): void {
    }

    closeSpin(): void {
        this.isSpinShow = false;
    }

}
