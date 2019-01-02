import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpResponseBase,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  NzNotificationService,
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';

import { AuthService } from 'src/app/auth/auth.service';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {}

  get modal(): NzModalService {
    return this.injector.get(NzModalService);
  }
  private checkStatus(ev: HttpResponseBase) {
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector
      .get(NzNotificationService)
      .error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    // this.checkStatus(ev);
    // 业务处理：一些通用操作
    if (ev.status === 200) {
      if (ev instanceof HttpResponse) {
        const body: any = ev.body;
        if (body && body.code !== 0) {
          switch (body.code) {
            case 205:
              this.modal.error({
                nzTitle: '登陆信息已过期',
                nzContent: '请重新登陆',
                nzOnOk : () => {this.authService.logout(); }
              });
          }
        } else {
          return of(ev);
        }
      }
    } else {
      this.checkStatus(ev);
    }
    return of(ev);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url.replace(/\s+/g, '');
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      if (req.headers.get('domain')) {
        url = environment[req.headers.get('domain')] + url;
      } else {
        url = environment.BASE_URL + url;
      }
    }

    const httpParams = {
      project_id: '10',
      admin_id: localStorage.getItem('admin_id'),
      admin_token: localStorage.getItem('admin_token')
    };
    Object.keys(httpParams).forEach(key => {
      if (!httpParams[key]) {
        delete httpParams[key];
      }
    });

    const newReq = req.clone({
      url: url,
      setParams: httpParams
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
}
