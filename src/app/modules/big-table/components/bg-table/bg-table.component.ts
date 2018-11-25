import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {SelectContainerComponent} from 'ngx-drag-to-select';

@Component({
  selector: 'app-table',
  templateUrl: './bg-table.component.html',
  styleUrls: ['./bg-table.component.css']
})
export class BgTableComponent implements OnInit {
  // it holds the rows of the json
  @Input() tableData: any[] = [];
  // it holds the data of one row only for the environment key
  @Input() environmentTableData = {};
  @Input() columnNames: string[] = [];
  @Input() environmentColumnNames: string[] = [];
  // holds the visibility status for all the columns
  @Input() columnVisibility: boolean[];
  @Input() columnsToFilterByRowVisibility = {};
  // holds the visibility status for the sub-table
  isSubTableVisible = false;
  selectedIDs = [];
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
  constructor(private _router: Router) {
  }

  ngOnInit() {
  }
  // it's responsible for hiding the pop up sub-table *that contains the environment info* and also the context menu
  hideAllPopUps() {
    this.isSubTableVisible = false;
  }
  // it's responsible for showing the pop up sub-table
  showPopUpTable() {
    this.isSubTableVisible = true;
  }

  openSmallTable(curId) {
    let args = "";
    if (this.selectedIDs.length === 0) {
      args += "mars_id[]=" + curId + "&";
    } else {
      for (let id in this.selectedIDs) {
        args += "mars_id[]=" + this.selectedIDs[id] + "&";
      }
    }
    args += "action=explore";
    window.open('/small-table?' + args, '_blank');
  }
  selectRow(id) {
    this.selectContainer.selectItems(item => item === id);
  }
}
