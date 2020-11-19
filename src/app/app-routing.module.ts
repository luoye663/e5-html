import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {BaseSettingComponent} from './user/base-setting/base-setting.component';
import {LogComponent} from './user/log/log.component';
import {UserComponent} from './user/user.component';
import {IndexComponent} from './index/index.component';
import {Page404Component} from './component/page404/page404.component';

const routes: Routes = [
  {
    path: 'index', component: IndexComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'user', component: UserComponent,
    children: [
      {
        path: 'baseSetting', component: BaseSettingComponent
      },
      {
        path: 'log', component: LogComponent
      },
    ]
  },
  {
    path: '404', component: Page404Component
  },
  {
    path: '**', redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
