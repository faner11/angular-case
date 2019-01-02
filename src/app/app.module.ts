import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { DefaultInterceptor } from './coer/net/default.interceptor.service';
import { StartupService } from './coer/startup/startup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgProgressModule} from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

export function StartupServiceFactory(
  startupService: StartupService
): Function {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgProgressModule,
    NgProgressHttpModule,
    SharedModule,
    LayoutModule,
    AppRoutingModule,
  ],
  providers: [
    ...APPINIT_PROVIDES,
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
