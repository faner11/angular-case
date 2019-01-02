import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as JsEncryptModule from 'jsencrypt';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

class User {
  userName: string;
  passWord: string;
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: User = {
    userName: '',
    passWord: ''
  };
  private RSA = new JsEncryptModule.JSEncrypt();
  // 公钥 https://github.com/travist/jsencrypt
  private readonly PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
    -----END PUBLIC KEY-----`;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  wtLogin(): void {
    const data = {
      admin_name: this.RSA.encrypt(this.user.userName),
      password: this.RSA.encrypt(this.user.passWord)
    };
    this.authService.login({
      admin_name: this.user.userName,
      admin_token: '123',
    });
    const redirect = this.authService.redirectUrl
    ? this.authService.redirectUrl
    : '/home';
  this.router.navigate([redirect]);


  // 多api前缀选择，通过headers传值
    // this.httpClient
    //   .get<Res.LoginResult>('admin/login', {
    //     params: data,
    //     headers: { domain: 'LOGIN_URL' }
    //   })
    //   .subscribe(res => {
    //     if (res.code === 0) {
    //       this.authService.login(res.result);
    //       if (this.authService.isLoggedIn) {
    //         const redirect = this.authService.redirectUrl
    //           ? this.authService.redirectUrl
    //           : '/home';
    //         this.router.navigate([redirect]);
    //       }
    //     }
    //   });
  }
  ngOnInit() {
    this.RSA.setPublicKey(this.PUBLIC_KEY);
  }
}
