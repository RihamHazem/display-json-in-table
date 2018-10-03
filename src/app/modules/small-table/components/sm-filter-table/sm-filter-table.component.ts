import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sm-filter-table',
  templateUrl: './sm-filter-table.component.html',
  styleUrls: ['./sm-filter-table.component.css']
})
export class SmFilterTableComponent implements OnInit {
  // it counts the occurrences of status field values in the given JSON
  @Input() map_status: string[] = [];
  // it counts the occurrences of f_status field
  @Input() map_fStatus: string[] = [];
  // it holds the current state of the status whether it's selected to be displayed or not
  @Input() isStatusVisible = {};
  @Output() filterMe = new EventEmitter<boolean>();
  // it holds the current state of the fStatus whether it's selected to be displayed or not
  @Input() isfStatusVisible = {};
  objectKeys = Object.keys;
  windowHeight = '0';
  // the word of the button that selects/deselects Status
  toggleSelectAll = "Deselect All";
  // the word of the button that selects/deselects fStatus
  toggle_fSelectAll = "Deselect All";

  constructor() {
    // just sits the height of the sidebar
    this.windowHeight = (window.innerHeight - 190).toString();
  }

  ngOnInit() {
  }
  // it informs the parent component that the user changed status of a column
  tellTheParentColumnChanges_S(item: string) {
    this.isStatusVisible[item] = !this.isStatusVisible[item];
    this.filterMe.emit(true);
  }
  // it informs the parent component that the user changed fStatus of a column
  tellTheParentColumnChanges_fS(item: string) {
    this.isfStatusVisible[item] = !this.isfStatusVisible[item];
    this.filterMe.emit(true);
  }
  // it toggles between selecting or deselecting all the sidebar options
  selectAll_S() {
    if (this.toggleSelectAll === "Deselect All") {
      for (let columnVisibleKey in this.isStatusVisible) {
        this.isStatusVisible[columnVisibleKey] = false;
      }
      this.toggleSelectAll = "Select All";
    } else {
      for (let columnVisibleKey in this.isStatusVisible) {
        this.isStatusVisible[columnVisibleKey] = true;
      }
      this.toggleSelectAll = "Deselect All";
    }
    this.filterMe.emit(true);
  }
  // it toggles between selecting or deselecting all the sidebar options
  selectAll_fS() {
    if (this.toggle_fSelectAll === "Deselect All") {
      for (let columnVisibleKey in this.isfStatusVisible) {
        this.isfStatusVisible[columnVisibleKey] = false;
      }
      this.toggle_fSelectAll = "Select All";
    } else {
      for (let columnVisibleKey in this.isfStatusVisible) {
        this.isfStatusVisible[columnVisibleKey] = true;
      }
      this.toggle_fSelectAll = "Deselect All";
    }
    this.filterMe.emit(true);
  }
}
