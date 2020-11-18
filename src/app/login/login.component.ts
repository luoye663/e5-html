import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Route, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) {
    route.queryParams.subscribe(value => {
      console.log(value);
    });
  }

  ngOnInit(): void {
  }

  goGithub(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {tokenc: 'ok'}
    };
    this.router.navigate(['https://github.com'], navigationExtras);
  }

}
