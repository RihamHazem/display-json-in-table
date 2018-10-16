import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContextMenuModule} from 'ngx-contextmenu';
import {DragToSelectModule} from 'ngx-drag-to-select';
import {NgbModalModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ContextMenuModule.forRoot({
      useBootstrap4: false
    }),
    DragToSelectModule.forRoot(),
    NgbModalModule,
    NgbTabsetModule,
    CoreModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
