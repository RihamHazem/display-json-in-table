import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../../../shared/get-json.service';
import {ql} from '@angular/core/src/render3';

@Component({
  selector: 'app-bg-home-page',
  templateUrl: './bg-home-page.component.html',
  styleUrls: ['./bg-home-page.component.css']
})
export class BgHomePageComponent implements OnInit {
  // holds the rows of the json
  tableData: any[] = [];
  gettingData = true;
  // holds info of one row only of the environment field
  environmentTableData: any = {};

  columnNames: string[] = [];
  excludedColumns: string[] = [];
  environmentColumnNames: string[] = [];
  // it maps the column name to is order in the given json
  columnIndices: any = {};
  // saves columns visibility
  columnVisibility: boolean[];
  columnsToFilterByRowMap = {"status": {}, "mgc_home_gpath": {}, "requested_vcos": {}};
  columnsToFilterByRowVisibility = {"status": {}, "mgc_home_gpath": {}, "requested_vcos": {}};
  // showing/hiding side bar
  isSideMenuVisible = true;

  constructor(private _getJsonService: GetJsonService) {
  }

  ngOnInit() {
  }
  // extracting info from the JSON
  updateTable(newParams: string) {
    if (newParams === "" || newParams === null || newParams === undefined) return;
    this.gettingData = true;
    this.emptyAllData();
    // get user preference data
    this._getJsonService.getCustomSettings().subscribe(data => {
      data.sort((a, b) => {
        if (a.index < b.index)
          return -1;
        else if (a.index === b.index)
          return 0;
        return 1;
      });
      data.forEach( row => {
        if (row['visibility'] === true) {
          this.columnIndices[row['col_name']] = row['index'];
          this.columnNames.push(row['col_name']);
          this.excludedColumns.push(row['col_name']);
        }
      });
    }, error => {
      console.log(error);
    });
    // get json table
    this._getJsonService.getJsonTable(newParams).subscribe(data => {
      let cnt = this.columnNames.length;
      // for all submissions
      for (let index in data) {
        let cur_row: any = {};
        // for all columns of a submission
        for (let key in data[index]) {
          // getting the name of columns
          if (index === '0') {
            // special case for test instance counts and environment
            if (key === 'test_instance_counts') {
              for (let in_key in data[index][key]) {
                if (this.excludedColumns.indexOf(in_key) === -1) {
                  // if this column wasn't in the excluded columns
                  this.columnNames.push(in_key);
                  this.columnIndices[in_key] = cnt;
                  cnt += 1;
                }
              }
            } else if(key === 'environment') {
              for (let in_key in data[index][key]) {
                this.environmentColumnNames.push(in_key);
                this.environmentTableData[in_key] = data[index][key][in_key];
              }
            } else {
              if (this.excludedColumns.indexOf(key) === -1) {
                // if it wasn't in the excluded columns
                this.columnNames.push(key);
                this.columnIndices[key] = cnt;
                cnt += 1;
              }
            }
          }
          if (this.columnsToFilterByRowMap.hasOwnProperty(key)) {
            if(this.columnsToFilterByRowMap[key].hasOwnProperty(data[index][key])) {
              this.columnsToFilterByRowMap[key][data[index][key]]++;
            } else {
              this.columnsToFilterByRowMap[key][data[index][key]] = 1;
              this.columnsToFilterByRowVisibility[key][data[index][key]] = true;
            }
          }
          // extracting info of rows
          if (key === 'test_instance_counts') {
            for (let in_key in data[index][key]) {
              if (data[index][key][in_key] === null || data[index][key][in_key] === undefined) {
                cur_row[in_key] = '___';
              } else {
                cur_row[in_key] = data[index][key][in_key];
              }
            }
          } else {
            if (data[index][key] === null || data[index][key] === undefined) {
              cur_row[key] = '___';
            } else {
              cur_row[key] = data[index][key];
            }
          }
        }
        // pushes the current row of the table data
        this.tableData.push(cur_row);
      }
      // fill the visibility of columns to false except name and status
      this.columnVisibility = new Array(this.columnNames.length);
      this.columnVisibility.fill(false);

      // mark excluded columns as true to be visible
      this.excludedColumns.forEach (excludedColumn => {
        this.columnVisibility[this.columnIndices[excludedColumn]] = true;
      });

      this.gettingData = false;
    }, error1 => {
      console.log("ERROR", error1);
    });
  }

  private emptyAllData() {
    this.tableData = [];
    this.environmentTableData = {};
    this.environmentColumnNames = [];
    this.columnIndices = {};
    this.columnVisibility = [];
    this.columnsToFilterByRowMap = {"status": {}, "mgc_home_gpath": {}, "requested_vcos": {}};
    this.columnsToFilterByRowVisibility = {"status": {}, "mgc_home_gpath": {}, "requested_vcos": {}};
    this.columnNames = [];
    this.isSideMenuVisible = true;
  }
  scrollDown1PX() {
    window.scrollTo(window.scrollX+1, window.scrollY+1);
  }

}
