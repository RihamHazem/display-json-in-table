import {Component, Input, OnInit} from '@angular/core';
import {FilterTablePipe} from "../../shared/filter-table.pipe";
import {GetJsonService} from "../../../../shared/get-json.service";

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
  @Input() tableData: any[] = [];
  @Input() columnNames: string[] = [];
  @Input() columnVisibility: boolean[];

  constructor() {
  }

  ngOnInit() {
  }
}
