import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {BaseSettingComponent} from './user/base-setting/base-setting.component';
import {LogComponent} from './user/log/log.component';
import {UserComponent} from './user/user.component';
import {IndexComponent} from './index/index.component';
import {Page404Component} from './component/page404/page404.component';
import {AuthGuard} from './auth/auth.guard';
import {PageResultComponent} from './component/page-result/page-result.component';

const routes: Routes = [
    /*首页*/
    {
        path: '', component: IndexComponent
    },
    /*登录*/
    {
        path: 'login', component: LoginComponent
    },
    /*用户*/
    {
        path: 'user', component: UserComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'baseSetting', component: BaseSettingComponent
            },
            {
                path: 'log', component: LogComponent
            },
        ]
    },
    /*结果页*/
    {
        path: 'auth2/receive', component: PageResultComponent
    },
    /*404*/
    {
        path: '404', component: Page404Component
    },
    /*没有的页面默认进404*/
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
