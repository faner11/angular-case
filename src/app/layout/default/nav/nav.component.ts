import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navList = [{
    url: '/home',
    text: '首页',
    icon: 'appstore',
    is_selected: false,
  }, {
    url: '/aaaa',
    text: '404',
    icon: 'appstore',
    is_selected: false,
  }, {
    url: '/login',
    text: '登陆',
    icon: 'bars',
    is_selected: false,
  }];
  constructor() { }

  ngOnInit() {
  }

}
