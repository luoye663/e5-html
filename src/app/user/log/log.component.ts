import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {
  reverse = false;
  radioValue = 'C';
  constructor(public router: ActivatedRoute) {
    router.queryParams.subscribe(value => {
      console.log(value,value['123']);
    });
  }

  ngOnInit(): void {
  }
  toggleReverse(): void {
    this.reverse = !this.reverse;
  }

}
