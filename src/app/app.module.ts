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
      useBootstrap4: true
    }),
    DragToSelectModule.forRoot(),
    CoreModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
