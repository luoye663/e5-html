import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Route, Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  isSpin = true;

  constructor(public route: ActivatedRoute, public router: Router, public http: HttpClientService) {
    route.queryParams.subscribe(value => {
      console.log(value);
    });
    http.get('https://api.e5.qyi.io/auth2/getGithubUrl').toPromise().then(value => {
      console.log(value);
      if (value.code === 0) {
        this.isSpin = false;
      }
    });
    // console.log('http返回请求', ht);
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
