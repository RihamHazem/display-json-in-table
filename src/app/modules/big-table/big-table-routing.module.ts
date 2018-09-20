import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BgHomePageComponent} from './components/bg-home-page/bg-home-page.component';

const bigTableRoutes: Routes = [
  {path: '', component: BgHomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(bigTableRoutes)
  ],
  exports: [RouterModule]
})
export class BigTableRoutesModule {
}
