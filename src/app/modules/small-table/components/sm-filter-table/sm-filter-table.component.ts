import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sm-filter-table',
  templateUrl: './sm-filter-table.component.html',
  styleUrls: ['./sm-filter-table.component.css']
})
export class SmFilterTableComponent implements OnInit {
  // it counts the occurrences of status field values in the given JSON
  @Input() columnFilterMap = {};
  // it holds the current state of the status whether it's selected to be displayed or not
  @Input() columnFilterVisibility = {};
  @Output() filterMe = new EventEmitter<boolean>();
  objectKeys = Object.keys;
  windowHeight = '0';
  // the word of the button that selects/deselects Status
  toggleSelectAll = {};

  constructor() {
    // just sits the height of the sidebar
    this.windowHeight = (window.innerHeight - 65).toString();
  }

  ngOnInit() {
  }
  // it informs the parent component that the user changed status of a column
  tellTheParentColumnChanges(item: string, columnName: string) {
    this.columnFilterVisibility[columnName][item] = !this.columnFilterVisibility[columnName][item];
    this.filterMe.emit(true);
  }
  // it toggles between selecting or deselecting all the sidebar options
  selectAll(columnName) {
    if (this.toggleSelectAll[columnName] === "Deselect All") {
      for (let columnVisibleKey in this.columnFilterVisibility[columnName]) {
        this.columnFilterVisibility[columnName][columnVisibleKey] = false;
      }
      this.toggleSelectAll[columnName] = "Select All";
    } else {
      for (let columnVisibleKey in this.columnFilterVisibility[columnName]) {
        this.columnFilterVisibility[columnName][columnVisibleKey] = true;
      }
      this.toggleSelectAll[columnName] = "Deselect All";
    }
    this.filterMe.emit(true);
  }
}
