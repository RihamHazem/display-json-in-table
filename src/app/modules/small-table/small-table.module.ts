import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmHomePageComponent } from './components/sm-home-page/sm-home-page.component';
import {SmallTableRoutesModule} from './small-table-routing.module';
import {SmTableComponent} from './components/sm-table/sm-table.component';
import {CoreModule} from '../../core/core.module';
import {SmFilterTableComponent} from './components/sm-filter-table/sm-filter-table.component';
import {SmFilterTablePipe} from './shared/sm-filter-table.pipe';

@NgModule({
  imports: [
    CommonModule,
    SmallTableRoutesModule,
    CoreModule
  ],
  declarations: [SmHomePageComponent, SmTableComponent, SmFilterTableComponent, SmFilterTablePipe],
  entryComponents: [SmHomePageComponent]
})
export class SmallTableModule { }
