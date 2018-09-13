import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./components/home-page/home-page.component";

const bigTableRoutes: Routes = [
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(bigTableRoutes)
  ],
  exports: [RouterModule]
})
export class BigTableRoutesModule {
}
