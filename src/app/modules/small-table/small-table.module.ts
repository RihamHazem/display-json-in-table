import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmHomePageComponent } from './components/sm-home-page/sm-home-page.component';
import {SmallTableRoutesModule} from './small-table-routing.module';
import {SmTableComponent} from './components/sm-table/sm-table.component';
import {CoreModule} from '../../core/core.module';
import {SmFilterTableComponent} from './components/sm-filter-table/sm-filter-table.component';
import {SmFilterTablePipe} from './shared/sm-filter-table.pipe';
import { SmTableParamsComponent } from './components/sm-table-params/sm-table-params.component';
import { SelectedDocFilterPipe } from './shared/selectedDoc-filter.pipe';
import {ContextMenuModule} from 'ngx-contextmenu';
import {DragToSelectModule} from 'ngx-drag-to-select';
import {MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatRadioModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTabsetModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { SubmissionsTableComponent } from './components/submissions-table/submissions-table.component';

@NgModule({
  imports: [
    CommonModule,
    SmallTableRoutesModule,
    ContextMenuModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DragToSelectModule,
    CoreModule,
    NgbTabsetModule,
    NgbCarouselModule
  ],
  exports: [],
  declarations: [SmHomePageComponent, SmTableComponent, SmFilterTableComponent, SmFilterTablePipe, SmTableParamsComponent, SelectedDocFilterPipe, SubmissionsTableComponent],
  entryComponents: [SmHomePageComponent]
})
export class SmallTableModule { }
