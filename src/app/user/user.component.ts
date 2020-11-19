import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor(private message: NzMessageService) {
  }

  ngOnInit(): void {
  }

  showMsg(): void {
    this.message.create('warning', `此功能正在测试中......`);
  }

}
