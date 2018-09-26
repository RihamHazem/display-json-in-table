import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../../../shared/get-json.service';

@Component({
  selector: 'app-sm-home-page',
  templateUrl: './sm-home-page.component.html',
  styleUrls: ['./sm-home-page.component.css']
})
export class SmHomePageComponent implements OnInit {
  // it contains all rows for the shown columns ["Tests", "Status"]
  myTableData = {};
  // it contains the columns that being displayed in the table
  columnNames: string[] = ["Tests"];
  // toggle sidebar visibility
  isSideMenuVisible = true;
  // it holds the visibility of Status Field
  statusVisibility = {};
  // it holds the visibility of fStatus field
  fStatusVisibility = {};
  // it holds all rows for all columns
  allTableData = {};
  // it holds all columns
  allColumnData: string[] = [];
  // it counts the occurrences of status field values in the given JSON
  map_status = {};
  // it counts the occurrences of f_status field
  map_fStatus = {};
  // it maps the test name to its index in the given JSON
  map_test_name = {};

  constructor( private _getJsonService: GetJsonService ) { }

  ngOnInit() {
    this.constructTable2();
  }
  constructTable2() {
    this._getJsonService.getJsonSmallTable().subscribe(data => {
      let once: boolean = true;
      let testIndex: number = 0;
      for (let i in data) {
        let curData = data[i]['test_instances'];
        this.columnNames.push("Status");
        for (let j in curData) {
          let test_name: string = curData[j]['test_name'];
          if (!this.myTableData.hasOwnProperty(test_name)) {
            this.myTableData[test_name] = new Array(data.length);
            this.map_test_name[test_name] = testIndex++;
          }
          let exec_status = curData[j]['exec_state'];
          let f_status = curData[j]['fstatus'];
          f_status = this.getUniqueSubSentences(curData[j]['fstatus']);
          this.myTableData[test_name][i] = {
            'Status': exec_status,
            'fStatus': f_status
          };
          if (this.map_status.hasOwnProperty(exec_status)) {
            // it counts the status value so that it would be used later for filtering the row's of the table
            this.map_status[exec_status]++;
          } else {
            // it sets the status value to 1.
            this.map_status[exec_status] = 1;
            // marks the rows that have all values of status as visible
            this.statusVisibility[exec_status] = true;
          }

          // then it's pushed to allTableData Object
          if (!this.allTableData.hasOwnProperty(test_name)) {
            this.allTableData[test_name] = new Array(data.length);
          }

          let temp = {};
          for (let key in curData[j]) {
            if (key === 'id' || key === 'test_name' || key === 'test_id') {
              continue;
            }
            temp[key] = curData[j][key];
            if (once) {
              // saves all the columns
              this.allColumnData.push(key);
            }
          }
          this.allTableData[test_name][i] = temp;
          once = false;
        }
      }
      for (let key in this.myTableData) {
        let curRow = this.myTableData[key];
        for (let index = 0; index < curRow.length; index++) {
          if (curRow[index] === undefined || curRow[index] === null) {
            if (!this.map_fStatus.hasOwnProperty("---")) {
              this.map_fStatus["---"] = 0;
            }
            if (this.map_status.hasOwnProperty("NO STATUS")) {
              this.map_status["NO STATUS"]++;
              this.map_fStatus["---"]++;
              curRow[index] = {
                "Status": "NO STATUS",
                "fStatus": ["---"]
              };
            } else {
              this.map_status["NO STATUS"] = 1;
              this.map_fStatus["---"]++;
              // marks the rows that have all values of status as visible
              this.statusVisibility["NO STATUS"] = true;
              curRow[index] = {
                "Status": "NO STATUS",
                "fStatus": ["---"]
              };
            }
          }
        }
      }
    });
  }

  public getUniqueSubSentences(str: string) {
    if (str === undefined || str === null) {
      str = "---";
    }
    let splitter = str.split(',');
    let mp = {};
    let ans: string[] = [];
    for (let i in splitter) {
      if (!mp.hasOwnProperty(splitter[i])) {
        ans.push(splitter[i]);
        if (this.map_fStatus.hasOwnProperty(splitter[i])) {
          this.map_fStatus[splitter[i]]++;
        } else {
          this.map_fStatus[splitter[i]] = 1;
          this.fStatusVisibility[splitter[i]] = true;
        }
      }
      mp[splitter[i]] = 1;
    }
    return ans;
  }
}
