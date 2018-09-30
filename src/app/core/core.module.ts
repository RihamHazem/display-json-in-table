import { NgModule } from '@angular/core';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {CommonModule} from '@angular/common';
import { MyContextMenuComponent } from './components/context-menu/my-context-menu.component';
import {ContextMenuModule} from 'ngx-contextmenu';

@NgModule({
  imports: [
    CommonModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true
    })
  ],
  declarations: [NavBarComponent, MyContextMenuComponent],
  exports: [NavBarComponent, MyContextMenuComponent]
})
export class CoreModule { }
