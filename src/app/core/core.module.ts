import { NgModule } from '@angular/core';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavBarComponent],
  exports: [NavBarComponent]
})
export class CoreModule { }
