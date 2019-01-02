import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportComponent } from './passport/passport.component';
import { NavComponent } from './default/nav/nav.component';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DefaultComponent , PassportComponent, NavComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LayoutModule { }
