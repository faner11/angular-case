import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';


import {SharedModule} from '../../shared/shared.module';
import { UserLoginComponent } from './pages/user-login/user-login.component';
@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
