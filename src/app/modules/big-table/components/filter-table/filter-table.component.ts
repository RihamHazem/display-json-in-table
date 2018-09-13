import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit, OnChanges {
  @Input() columnNames: string[] = [];
  @Input() isColumnVisible: boolean[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {

  }

  tellTheParentColumnChanges(index: number) {
    this.isColumnVisible[index] = !this.isColumnVisible[index];
  }
}
