import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isSideMenuVisible = true;
  @Input() hasBurgerButton = true;
  @Output() sideMenuIsVisible = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  hideSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
    this.sideMenuIsVisible.emit(this.isSideMenuVisible);
  }
}
