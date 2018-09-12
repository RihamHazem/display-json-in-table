import {Component, EventEmitter, OnInit} from '@angular/core';
import {Output} from "@angular/core";

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {
  @Output() toggleColumnVisibility = new EventEmitter<number>();

  columnNames: string[] = ["id", "firstName", "lastName", "university", "faculty"];
  columnPresentation: string[] = ["ID", "First Name", "Last Name", "University", "Faculty"];
  isVisible: boolean[] = new Array(5);

  constructor() {
    this.isVisible.fill(true);
  }

  ngOnInit() {
  }

  tellTheParent(index: number) {
    console.log("I've been changed!!, " + index);
    this.isVisible[index] = !this.isVisible;
    this.toggleColumnVisibility.emit(index)
  }
}
