import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotfoundRoutingModule
  ]
})
export class NotfoundModule { }
