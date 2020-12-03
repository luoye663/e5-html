import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-base-setting',
  templateUrl: './base-setting.component.html',
  styleUrls: ['./base-setting.component.less']
})
export class BaseSettingComponent implements OnInit {
  listOfData: any = [
    {
      key: '1',
      name: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      describe: '描述',
      client_id: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      client_secret: 'fertrt4ERWr34@',
      static: '运行中',
      static_color: '#87d068',
      time: '3600-7200',
      next_time: '2020-01-01 11:11:12'
    },
    {
      key: '1',
      name: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      describe: '描述',
      client_id: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      client_secret: 'fertrt4ERWr34@',
      static: '运行中',
      static_color: '#87d068',
      time: '3600-7200',
      next_time: '2020-01-01 11:11:12'
    },{
      key: '1',
      name: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      describe: '描述',
      client_id: '5bde67b4-bd76-4a4c-9e75-872deb11xxx2',
      client_secret: 'fertrt4ERWr34@',
      static: '运行中',
      static_color: '#87d068',
      time: '3600-7200',
      next_time: '2020-01-01 11:11:12'
    },
  ];
  /*显示对话框*/
  isVisible = false;
  current = 0;
  index = 'First-content';
  isNewClient = false;
  newFrom = {
    name: '',
    describe: ''
  };

  constructor() {
  }

  ngOnInit(): void {

  }
  handleNewClient(): void {
    this.isNewClient = true;
  }
  handleNewClone(): void {
    this.isNewClient = false;
  }
  handleNewOK(): void {
    this.isNewClient = false;
  }
  handleCancel(): void {
    this.isVisible = !this.isVisible;
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
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
