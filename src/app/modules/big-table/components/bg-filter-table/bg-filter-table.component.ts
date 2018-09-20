import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bg-filter-table',
  templateUrl: './bg-filter-table.component.html',
  styleUrls: ['./bg-filter-table.component.css']
})
export class BgFilterTableComponent implements OnInit {
  // holds the name of the columns
  @Input() columnNames: string[] = [];
  // holds the visibility status of the columns
  @Input() isColumnVisible: boolean[] = [];
  windowHeight = '0';
  // holds the selecting button's name
  toggleSelectAll = "Select All";

  constructor() {
    this.windowHeight = (window.innerHeight - 85).toString();
  }

  ngOnInit() {
  }
  // tells the parent that the user has changed the status of column's visibility
  tellTheParentColumnChanges(index: number) {
    this.isColumnVisible[index] = !this.isColumnVisible[index];
  }
  // it toggles between selecting/deselecting all the filtering options
  selectAll() {
    if (this.toggleSelectAll === "Deselect All") {
      this.isColumnVisible.fill(false);
      this.toggleSelectAll = "Select All";
    } else {
      this.isColumnVisible.fill(true);
      this.toggleSelectAll = "Deselect All";
    }
  }
}
