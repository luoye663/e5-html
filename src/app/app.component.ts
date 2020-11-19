import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'e5-html';
  constructor(private router: Router) {
  }
  gotoLogin(): void {
    // window.location.href = '/login';
    this.router.navigateByUrl('/login');
  }
}
