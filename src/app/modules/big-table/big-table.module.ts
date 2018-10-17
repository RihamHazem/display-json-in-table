import { NgModule } from '@angular/core';
import { BigTableRoutesModule } from './big-table-routing.module';
import { BgTableComponent } from './components/bg-table/bg-table.component';
import { CommonModule } from '@angular/common';
import { BgFilterTableComponent } from './components/bg-filter-table/bg-filter-table.component';
import { FilterTablePipe } from './shared/filter-table.pipe';
import { BgHomePageComponent } from './components/bg-home-page/bg-home-page.component';
import {CoreModule} from '../../core/core.module';
import { BgTableParamsComponent } from './components/bg-table-params/bg-table-params.component';
import { FilterRowPipe } from './shared/filter-row.pipe';
import {DragToSelectModule} from 'ngx-drag-to-select';
import {ContextMenuModule} from 'ngx-contextmenu';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BigTableRoutesModule,
    DragToSelectModule,
    ContextMenuModule,
    CoreModule
  ],
  declarations: [BgTableComponent, BgFilterTableComponent, FilterTablePipe, 
                 BgHomePageComponent, BgTableParamsComponent, FilterRowPipe],
  entryComponents: [BgHomePageComponent]
})
export class BigTableModule { }
