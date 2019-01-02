import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  isLoggedIn = false;
  nick_name: string;
  isCollapsed;
  constructor(
    private authService: AuthService
  ) { }
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
  }

}
