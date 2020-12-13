import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BaseSettingComponent} from './user/base-setting/base-setting.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzInputModule} from 'ng-zorro-antd/input';
import {LogComponent} from './user/log/log.component';
import {NzTimelineModule} from 'ng-zorro-antd/timeline';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {UserComponent} from './user/user.component';
import {IndexComponent} from './index/index.component';
import {Page404Component} from './component/page404/page404.component';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {HttpClientService} from './service/http-client.service';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {StorageService} from './service/storage.service';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {OutlookComponent} from './auth/outlook/outlook.component';
import {GithubComponent} from './auth/github/github.component';
import {httpInterceptorProviders} from './http-interceptors/httpInterceptorProviders';
import {MessageService} from './service/message.service';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        BaseSettingComponent,
        LogComponent,
        UserComponent,
        IndexComponent,
        Page404Component,
        OutlookComponent,
        GithubComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzButtonModule,
        NzLayoutModule,
        NzBreadCrumbModule,
        NzMenuModule,
        NzCardModule,
        NzGridModule,
        NzInputModule,
        NzTimelineModule,
        NzTagModule,
        NzPopconfirmModule,
        NzResultModule,
        NzIconModule,
        NzMessageModule,
        NzSpinModule,
        NzPopoverModule,
        NzTableModule,
        NzModalModule,
        NzStepsModule,
        NzToolTipModule,
        NzRadioModule,
        NzAlertModule,
        NzNotificationModule,
        CommonModule
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}, DatePipe, HttpClientService, MessageService, StorageService, httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
