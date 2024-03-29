import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../service/storage.service';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../../service/message.service';
import {HttpClientService} from '../../service/http-client.service';
import {NzModalService} from 'ng-zorro-antd/modal';

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
  donation = true;
  userReplyUrl = false;
  newFrom = {
    name: '',
    describe: ''
  };
  stepsInfo = {
    id: 0,
    clientId: '',
    clientSecret: '',
    tenantId: '',
    cronTimeRandomStart: '',
    cronTimeRandomEnd: '',
    cronTimeRandom: '',
    isNextButton: false
  };

  constructor(private storage: StorageService, private http: HttpClientService, private msg: MessageService,
              private modal: NzModalService) {
    this.getOutlookList(false);
    if (storage.get('donation')) {
      this.donation = false;
    }
    /*this.modal.create({
      nzTitle: '关于续订程序出现授权出错问题',
      nzContent: '程序已更新，请查看最新的教程，弹窗于一周后自动关闭: https://qyi.io/archives/687.html',
      nzClosable: false,
    });*/
  }

  getOutlookList(isEmpty): void {
    if (isEmpty) {
      this.listOfData = [];
    }
    this.isTableLoading = true;
    this.http.get('/outlook/outlook/getOutlookList', {}, value => {
      value.data.forEach((v: any) => {
        this.listOfData.push({
          key: v.id,
          name: v.name,
          describe: v.describes,
          client_id: v.clientId,
          client_secret: v.clientSecret,
          static: this.getStatus(v.status),
          static_color: this.getStaticColor(v.status),
          time: v.cronTimeRandomStart + '-' + v.cronTimeRandomEnd,
          next_time: v.nextTime
        });
      });
      // this.listOfData.push();
      this.isTableLoading = false;
    });
  }

  /*
  * 状态: 1、等待配置 2、暂停 3、运行中 4、封禁 5、已停止(由于调用错误导致的停止)6、等待授权 7、授权失败
  * 8、配置时间
  * */
  getStatus(status): string {
    let val: string;
    switch (status) {
      case 1:
        val = '等待配置';
        break;
      case 2:
        val = '暂停';
        break;
      case 3:
        val = '运行中';
        break;
      case 4:
        val = '封禁';
        break;
      case 5:
        val = '已停止';
        break;
      case 6:
        val = '等待授权';
        break;
      case 7:
        val = '授权失败';
        break;
      case 8:
        val = '配置时间';
        break;
      default:
        val = '未知';
    }
    return val;
  }

  getStaticColor(status): string {
    let val: string;
    switch (status) {
      case 1:
        val = 'default';
        break;
      case 2:
        /*暂停*/
        val = 'red';
        break;
      case 3:
        /*绿色*/
        val = 'green';
        break;
      case 4:
        val = '#108ee9';
        break;
      case 5:
        val = 'red';
        break;
      case 6:
        /*等待授权*/
        val = 'orange';
        break;
      case 7:
        val = '#108ee9';
        break;
      case 8:
        val = 'geekblue';
        break;
      default:
        val = '#108ee9';
    }
    return val;
  }

  ngOnInit(): void {
  }

  handleNewClient(): void {
    if (this.listOfData.length > 4) {
      this.msg.createNotification('error', '目前只允许添加5个应用。');
      return;
    }
    this.isNewClient = true;
  }

  handleNewClone(): void {
    this.isNewClient = false;
  }

  /*新建-ok*/
  handleNewOK(): void {
    this.OkDisabled = true;
    // this.isNewClient = false;
    this.http.post('/outlook/outlook/insertOne', {name: this.newFrom.name, describe: this.newFrom.describe}, value => {
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

  /*点击 配置时间*/
  handelSetting(key): void {
    this.isVisible = true;
    this.http.get('/outlook/outlook/getOutlookInfo', {params: {id: key}}, value => {
      this.stepsInfo = value.data;
      this.stepsInfo.cronTimeRandom = value.data.cronTimeRandomStart + '-' + value.data.cronTimeRandomEnd;
      this.current = value.data.step;
    });
  }

  /*
  * 设置暂停状态
  * */
  handelSetPause(key): void {
    this.http.get('/outlook/outlook/setPause', {params: {id: key}}, dvalue => {
      this.msg.createBasicMessageSuccess('设置成功!');
      this.getOutlookList(true);
    });
  }

  /*
  * 设置开始状态（待授权）
  * */
  handelSetStart(key): void {
    this.http.get('/outlook/outlook/setStart', {params: {id: key}}, dvalue => {
      this.msg.createBasicMessageSuccess('设置成功!');
      this.getOutlookList(true);
    });
  }

  handelAuthorize(key): void {
    this.http.get('/outlook/auth2/getAuthorizeUrl', {params: {id: key}}, value => {
      console.log(value);
      window.location.href = value.data;
    });
  }

  handleCancel(): void {
    this.isVisible = !this.isVisible;
    this.getOutlookList(true);
  }

  /*
  *  获取调用时间
  * */
  handelGetNextTime(ids): void {
    this.http.get('/outlook/auth2/getAuthorizeUrl', {params: {id: ids}}, value => {
      console.log(value);
      window.location.href = value.data;
    });
  }

  /*
  * 删除
  * */
  handelDelete(outlookId, name): void {
    this.modal.create({
      nzTitle: '删除此项',
      nzContent: '将删除 ' + name + ' ?',
      nzClosable: false,
      nzOnOk: () => {
        this.http.get('/outlook/outlook/delete', {params: {id: outlookId}}, value => {
          this.msg.createBasicMessageSuccess('删除成功');
          const chat = this;
          setTimeout(() => {
            this.getOutlookList(true);
          }, 1000);
        });
      }
    });
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    switch (this.current) {
      /*保存key*/
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
            outlook_id: this.stepsInfo.id,
            tenant_id: this.stepsInfo.tenantId
          }, value => {
            this.current += 1;
          });
        this.setNextButtonStatus(false);
        break;
      /*保存时间*/
      case 1:
        const cronTime = this.stepsInfo.cronTimeRandom.split('-');
        if (cronTime.length !== 2 || parseInt(cronTime[0], 10) < 1 || parseInt(cronTime[1], 10) < 1) {
          this.msg.createBasicMessageError('请正确填写时间范围');
          return;
        }
        this.stepsInfo.isNextButton = true;
        this.http.post('/outlook/outlook/saveRandomTime', {
          outlookId: this.stepsInfo.id,
          cronTime: 0,
          crondomTime: this.stepsInfo.cronTimeRandom
        }, value => {
          this.current += 1;
          this.changeContent();
        });
        this.setNextButtonStatus(false);
        break;
    }
  }

  done(): void {
    console.log('done');
    this.handelAuthorize(this.stepsInfo.id);
  }

  setNextButtonStatus(v): void {
    this.stepsInfo.isNextButton = v;
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

  handelDonation(bool): void {
    if (bool) {
      this.donation = true;
    } else {
      this.donation = false;
    }
  }

  getUserReplyUrlToOutlook(): void {
    this.http.get('/getUserReplyUrlToOutlook', {}, value => {
      this.modal.create({
        nzTitle: '请勿泄露回调地址',
        nzContent: value.data,
        nzClosable: false,
      });
    });
  }

  donationClosePermanent(): void {
    this.donation = false;
    this.storage.set('donation', 1);
  }
}
