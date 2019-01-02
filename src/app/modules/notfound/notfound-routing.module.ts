import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';

const routes: Routes = [
  {path: '', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class NotfoundRoutingModule { }
