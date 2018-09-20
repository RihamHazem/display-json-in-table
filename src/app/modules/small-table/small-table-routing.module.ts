import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SmHomePageComponent} from './components/sm-home-page/sm-home-page.component';

const smallTableRoutes: Routes = [
  {path: '', component: SmHomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(smallTableRoutes)
  ],
  exports: [RouterModule]
})
export class SmallTableRoutesModule {
}
