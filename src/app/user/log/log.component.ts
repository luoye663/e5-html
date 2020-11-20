import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {
  reverse = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleReverse(): void {
    this.reverse = !this.reverse;
  }

}
