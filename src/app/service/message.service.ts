import {Injectable} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private notification: NzNotificationService, private message: NzMessageService) {
    }

    createNotification(type: string, msg: string): void {
        this.notification.create(
            type,
            '信息',
            msg,
            {nzDuration: 6 * 1000}
        );
    }

    createBasicMessageSuccess(msg: string): void {
        this.message.success(msg, {
            nzDuration: 3000
        });
    }
    createBasicMessageError(msg: string): void {
        this.message.error(msg, {
            nzDuration: 3000
        });
    }
}
