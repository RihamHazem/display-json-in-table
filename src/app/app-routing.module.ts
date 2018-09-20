import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './modules/big-table/big-table.module#BigTableModule'},
  {path: 'big-table', loadChildren: './modules/big-table/big-table.module#BigTableModule'},
  {path: 'small-table', loadChildren: './modules/small-table/small-table.module#SmallTableModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
