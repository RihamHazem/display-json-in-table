import { NgModule } from '@angular/core';
import { BigTableRoutesModule } from "./big-table-routing.module";
import { TableComponent } from './components/table/table.component';
import { CommonModule } from "@angular/common";
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { FilterTablePipe } from './shared/filter-table.pipe';

@NgModule({
  imports: [
    CommonModule,
    BigTableRoutesModule
  ],
  declarations: [TableComponent, FilterTableComponent, FilterTablePipe],
  entryComponents: [TableComponent]
})
export class BigTableModule { }
