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
import {DragToSelectModule} from 'ngx-drag-to-select';
import {MatAutocompleteModule, MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SmallTableRoutesModule,
    ContextMenuModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    DragToSelectModule,
    CoreModule
  ],
  exports: [],
  declarations: [SmHomePageComponent, SmTableComponent, SmFilterTableComponent, SmFilterTablePipe, SmTableParamsComponent, DummyFilterPipe],
  entryComponents: [SmHomePageComponent]
})
export class SmallTableModule { }
