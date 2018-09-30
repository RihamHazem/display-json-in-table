import {Component, OnInit} from '@angular/core';
import {GetJsonService} from '../../../../shared/get-json.service';

@Component({
  selector: 'app-bg-home-page',
  templateUrl: './bg-home-page.component.html',
  styleUrls: ['./bg-home-page.component.css']
})
export class BgHomePageComponent implements OnInit {
  // holds the rows of the json
  tableData: any[] = [];
  gettingData = false;
  // holds info of one row only of the environment field
  environmentTableData: any = {};

  columnNames: string[] = [];
  environmentColumnNames: string[] = [];
  // it maps the column name to is order in the given json
  columnIndices: any = {};
  // saves columns visibility
  columnVisibility: boolean[];
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
    console.log(newParams);
    this._getJsonService.getJsonTable(newParams).subscribe(data => {
      let cnt = 0;
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
                this.columnNames.push(in_key);
                this.columnIndices[in_key] = cnt;
                cnt += 1;
              }
            } else if(key === 'environment') {
              for (let in_key in data[index][key]) {
                this.environmentColumnNames.push(in_key);
                this.environmentTableData[in_key] = data[index][key][in_key];
              }
            } else {
              this.columnNames.push(key);
              this.columnIndices[key] = cnt;
              cnt += 1;
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
      this.columnVisibility[this.columnIndices['name']] = true;
      this.columnVisibility[this.columnIndices['status']] = true;
      this.gettingData = false;
    });
  }

}
