import { Injectable } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private notification: NzNotificationService) { }

  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '信息',
      msg,
      {nzDuration: 6 * 1000}
    );
  }
}
