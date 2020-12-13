import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../service/storage.service';
import {HttpClientService} from '../../service/http-client.service';
import {MessageService} from '../../service/message.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {
    reverse = false;
    radioValue = 'C';
    /*是否选中*/
    radioModelArr = {};
    listOfData = [];
    log = [];

    constructor(public router: ActivatedRoute,
                private storage: StorageService,
                private http: HttpClientService,
                private msg: MessageService) {
        let id;
        router.queryParams.subscribe(value => {
            console.log(value, value.id);
            id = value.id;
        });
        if (id) {
            this.getLog(id);
            this.getOutlookListToRadio(true, id);
        } else {
            this.getOutlookListToRadio(true);
        }
    }

    ngOnInit(): void {
    }

    toggleReverse(): void {
        this.reverse = !this.reverse;
    }

    getOutlookListToRadio(isEmpty, key?): void {
        if (isEmpty) {
            this.listOfData = [];
        }
        this.http.get('/outlook/outlook/getOutlookList', {}, value => {
            value.data.forEach((v: any) => {
                this.radioModelArr['rm_' + v.id] = false;
                this.listOfData.push({
                    key: v.id,
                    name: v.name,
                });
            });
            if (key) {
                this.radioModelArr['rm_' + key] = true;
            }
        });
    }

    handelRadio(va): void {
        this.getLog(va);
    }

    /*获取日志*/
    getLog(id): void {
        this.http.get('/outlookLog/findLog', {params: {outlookId: id}}, value => {
            this.log.splice(0, this.log.length);
            value.data.forEach((v: any) => {
                this.log.push({
                    callTime: v.callTime,
                    result: v.result,
                    msg: v.msg,
                    originalMsg: v.originalMsg,
                });
            });
        });
    }
}
