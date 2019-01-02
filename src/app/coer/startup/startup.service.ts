import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(protected http: HttpClient) {}
   load() {
    this.check_login();
   }
   // 检查登陆
  check_login() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    console.log('页面初始化执行代码');
  }
}
