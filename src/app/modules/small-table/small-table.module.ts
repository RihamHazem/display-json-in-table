import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmHomePageComponent } from './components/sm-home-page/sm-home-page.component';
import {SmallTableRoutesModule} from './small-table-routing.module';
import {SmTableComponent} from './components/sm-table/sm-table.component';
import {CoreModule} from '../../core/core.module';
import {SmFilterTableComponent} from './components/sm-filter-table/sm-filter-table.component';
import {SmFilterTablePipe} from './shared/sm-filter-table.pipe';
import { SmTableParamsComponent } from './components/sm-table-params/sm-table-params.component';
import { DummyFilterPipe } from './shared/dummy-filter.pipe';
import {ContextMenuModule} from 'ngx-contextmenu';

@NgModule({
  imports: [
    CommonModule,
    SmallTableRoutesModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }),
    CoreModule
  ],
  exports: [],
  declarations: [SmHomePageComponent, SmTableComponent, SmFilterTableComponent, SmFilterTablePipe, SmTableParamsComponent, DummyFilterPipe],
  entryComponents: [SmHomePageComponent]
})
export class SmallTableModule { }
