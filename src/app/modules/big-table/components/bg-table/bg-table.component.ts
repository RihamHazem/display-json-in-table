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
    window.open('/user/rhazem/website/production/JsonParsing/small-table?' + args, '_blank');
  }
  selectRow(id) {
    this.selectContainer.selectItems(item => item === id);
  }
  // a recursive function for displaying table
  // arrays displayed in list
  // json displays in table
  displayContent(value) {
    if (Array.isArray(value) === true) {
      let res = "<ul class=\"list-group custom-list\">\n";
      value.forEach( (item) => {
        if (typeof item === 'object') {
          item = this.displayContent(item);
        } else if (item === null || item === undefined) item = "---";
        res += "<li class=\"list-group-item\" *ngFor=\"let cur_DEI of objectKeys(shownDEIs[cur_tab])\">\n" + item + "</li>\n";
      });
      res += "</ul>";
      return res;
    } else if (typeof value === 'object') {
      let res = "<table  class=\"table table-striped\">";
      for (let key in value) {
        let item = value[key];
        if (typeof item === 'object') {
          item = this.displayContent(item);
        } else if (item === null || item === undefined) item = "---";
        res += "<tr> <th>" + key + "</th> <td>" + item + "</td> </tr>";
      }
      res += "</table>";
      return res;
    } else if (value === null || typeof value === 'undefined') {
      return "---";
    }
    return value;
  }
}
