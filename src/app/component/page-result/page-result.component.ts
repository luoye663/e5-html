import {Component, OnInit} from '@angular/core';
import {RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.less']
})
export class PageResultComponent implements OnInit {

  constructor(private router: RouterLinkActive) {
  }

  ngOnInit(): void {
  }

}
