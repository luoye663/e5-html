import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../../service/http-client.service';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.less']
})
export class GithubComponent implements OnInit {
  info = {status: '', title: '', subTitle: ''};
  subInfo = {code: '', state: ''};
  isSpinShow = true;

  constructor(private route: ActivatedRoute, private http: HttpClient, datePipe: DatePipe, storage: StorageService) {
    route.queryParams.subscribe(value => {
      console.log(value);
      this.subInfo.code = value.code;
      this.subInfo.state = value.state;
    });
    /*缺少参数*/
    if (this.subInfo.code == null || this.subInfo.state == null || this.subInfo.code.length < 1 || this.subInfo.state.length < 1) {
      this.info.status = 'error';
      this.info.title = '缺少参数';
      this.info.subTitle = '从github返回的信息中缺少 code 或 state 参数!';
      this.closeSpin();
      return;
    }
    const data = {
      code: this.subInfo.code,
      state: this.subInfo.state
    };
    http.get('/auth2/receive', {params: data}).subscribe((value: any) => {
      console.log(value);
      switch (value.code) {
        case 0:
          storage.set('authority', value.data.authority);
          storage.set('expire', (Date.parse(new Date().toISOString()) / 1000) + value.data.expire);
          storage.set('token', value.data.token);
          storage.set('username', value.data.username);
          this.info.status = 'success';
          this.info.title = '登录成功!';
          this.closeSpin();
          break;
        case -1:
          this.info.status = 'error';
          this.info.title = '登录失败';
          this.closeSpin();
          break;
        default:
          this.info.status = 'error';
          this.info.title = '登录失败';
          this.info.subTitle = value.msg + ',时间:' + datePipe.transform(value.data, 'yyyy-MM-dd HH:mm:ss');
          this.closeSpin();
      }
    });
  }

  ngOnInit(): void {
  }

  closeSpin(): void {
    this.isSpinShow = false;
  }

}
