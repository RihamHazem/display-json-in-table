import { Component, OnInit } from '@angular/core';
import {FilterTablePipe} from "../../shared/filter-table.pipe";

export interface TableInfo {
  id: number;
  firstName: string;
  lastName: string;
  university: string;
  faculty: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columnNames: string[] = ["id", "firstName", "lastName", "university", "faculty"];
  columnPresentation: string[] = ["ID", "First Name", "Last Name", "University", "Faculty"];
  columnVisibility: boolean[] = new Array(5);

  rows: TableInfo[] = [
    {
      id: 1,
      firstName: "Riham",
      lastName: "Hazem",
      university: "Cairo",
      faculty: "Engineering"
    },
    {
      id: 2,
      firstName: "Mohab",
      lastName: "Hazem",
      university: "Cairo",
      faculty: "Computer and Information System"
    },
    {
      id: 3,
      firstName: "Doaa",
      lastName: "Mohammed",
      university: "Alex",
      faculty: "Computer and Information System"
    },
    {
      id: 4,
      firstName: "Hoda",
      lastName: "Alaa",
      university: "Alex",
      faculty: "Computer Engineering"
    },
    {
      id: 5,
      firstName: "Riham",
      lastName: "Hazem",
      university: "Cairo",
      faculty: "Engineering"
    },
    {
      id: 6,
      firstName: "Hager",
      lastName: "Hussein",
      university: "Cairo",
      faculty: "Computer and Information System"
    },
    {
      id: 7,
      firstName: "Doaa",
      lastName: "Mohammed",
      university: "Alex",
      faculty: "Computer and Information System"
    }
  ];

  constructor() {
    this.columnVisibility.fill(true);
  }

  ngOnInit() {
  }

  onToggleColumn(index: number) {
    this.columnVisibility[index] = !this.columnVisibility[index];
  }
}
