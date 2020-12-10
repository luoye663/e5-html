import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../service/storage.service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../../service/message.service';

@Component({
    selector: 'app-base-setting',
    templateUrl: './base-setting.component.html',
    styleUrls: ['./base-setting.component.less']
})
export class BaseSettingComponent implements OnInit {
    /*列表*/
    listOfData: any = [];
    /*显示对话框*/
    isVisible = false;
    current = 0;
    index = 'First-content';
    isNewClient = false;
    isTableLoading = true;
    OkDisabled = false;
    newFrom = {
        name: '',
        describe: ''
    };
    stepsInfo = {
        id: 0,
        clientId: '',
        clientSecret: '',
        cronTimeRandomStart: '',
        cronTimeRandomEnd: '',
        cronTimeRandom: '',
        isNextButton: false
    };

    constructor(private storage: StorageService, private http: HttpClient, private msg: MessageService) {
        this.getOutlookList(false);
    }

    getOutlookList(isEmpty): void {
        if (isEmpty) {
            this.listOfData = [];
        }
        this.isTableLoading = true;
        this.http.get('/outlook/outlook/getOutlookList').subscribe((value: any) => {
            value.data.forEach((v: any) => {
                this.listOfData.push({
                    key: v.id,
                    name: v.name,
                    describe: v.describes,
                    client_id: v.clientId,
                    client_secret: v.clientSecret,
                    static: '运行中',
                    static_color: '#87d068',
                    time: v.cronTimeRandomStart + '-' + v.cronTimeRandomEnd,
                    next_time: v.nextTime
                });
            });
            // this.listOfData.push();
            this.isTableLoading = false;
        });
    }

    ngOnInit(): void {
    }

    handleNewClient(): void {
        this.isNewClient = true;
    }

    handleNewClone(): void {
        this.isNewClient = false;
    }

    /*新建-ok*/
    handleNewOK(): void {
        this.OkDisabled = true;
        // this.isNewClient = false;
        this.http.post('/outlook/outlook/insertOne', {name: this.newFrom.name, describe: this.newFrom.describe}).subscribe((value: any) => {
            console.log(value);
            if (value.code === 0) {
                this.msg.createNotification('success', '创建成功!');
                this.isNewClient = false;
                this.getOutlookList(true);
            } else {
                this.msg.createNotification('error', value.data);
            }
            this.OkDisabled = false;
        });
    }

    handelSetting(key): void {
        this.isVisible = true;
        this.http.get('/outlook/outlook/getOutlookInfo', {params: {id: key}}).subscribe((value: any) => {
            this.stepsInfo = value.data;
            this.stepsInfo.cronTimeRandom = value.data.cronTimeRandomStart + '-' + value.data.cronTimeRandomEnd;
        });
        console.log('点击key', key);
    }

    handleCancel(): void {
        this.isVisible = !this.isVisible;
        this.getOutlookList(true);
    }

    pre(): void {
        this.current -= 1;
        this.changeContent();
    }

    next(): void {
        console.log(this.current, this.stepsInfo);
        switch (this.current) {
            case 0:
                if (this.stepsInfo.clientId == null ||
                    this.stepsInfo.clientSecret == null ||
                    this.stepsInfo.clientId.length < 1 ||
                    this.stepsInfo.clientSecret.length < 1) {
                    this.msg.createBasicMessageError('请不要留空');
                    return;
                }
                this.stepsInfo.isNextButton = true;
                this.http.post('/outlook/outlook/save',
                    {
                        client_id: this.stepsInfo.clientId,
                        client_secret: this.stepsInfo.clientSecret,
                        outlook_id: this.stepsInfo.id
                    }
                ).subscribe((value: any) => {
                    console.log(value);
                    this.stepsInfo.isNextButton = false;
                });
                break;
            case 1:
                const cronTime = this.stepsInfo.cronTimeRandom.split('-');
                if (cronTime.length !== 2 || parseInt(cronTime[0], 10) < 1 || parseInt(cronTime[1], 10) < 1) {
                    this.msg.createBasicMessageError('请正确填写时间范围');
                    return;
                }
                this.stepsInfo.isNextButton = true;
                this.http.post('/outlook/outlook/saveRandomTime', {
                    cronTime: 0,
                    crondomTime: this.stepsInfo.cronTimeRandom
                }).subscribe((value: any) => {
                    console.log(value);
                    this.stepsInfo.isNextButton = false;
                });
                break;
        }
        this.current += 1;
        this.changeContent();
    }

    done(): void {
        console.log('done');
    }

    changeContent(): void {
        switch (this.current) {
            case 0: {
                this.index = 'ssss';
                break;
            }
            case 1: {
                this.index = 'Second-content';
                break;
            }
            case 2: {
                this.index = 'third-content';
                break;
            }
            default: {
                this.index = 'error';
            }
        }
    }
}
