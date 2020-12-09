import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('路由', state.url);
    const b = this.checkLogin(state.url);
    return b;
  }

  checkLogin(url): boolean {
    console.log('守卫', url);
    if (this.storage.get('token') == null) {
      console.log('token不存在');
      this.router.navigate(['/login'], {queryParams: {errorText: '未登陆!'}});
      return false;
    }
    const expire = this.storage.get('expire');
    if (expire == null || expire - (Date.parse(new Date().toISOString()) / 1000) < 0) {
      console.log('到期时间不存在或已到期!', expire, expire - (Date.parse(new Date().toISOString()) / 1000));
      this.router.navigate(['/login'], {queryParams: {errorText: '会话已超时,请重新登录!'}});
      this.storage.remove('token');
      this.storage.remove('expire');
      return false;
    }
    return true;
  }
}
