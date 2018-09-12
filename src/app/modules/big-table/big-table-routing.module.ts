import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TableComponent} from "./components/table/table.component";

const bigTableRoutes: Routes = [
  {path: '', component: TableComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(bigTableRoutes)
  ],
  exports: [RouterModule]
})
export class BigTableRoutesModule {
}
