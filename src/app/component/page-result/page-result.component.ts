import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.less']
})
export class PageResultComponent implements OnInit {

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
