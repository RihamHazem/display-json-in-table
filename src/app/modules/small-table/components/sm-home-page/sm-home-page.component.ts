import {Component, OnInit, ViewChild} from '@angular/core';
import { GetJsonService } from '../../../../shared/get-json.service';
import {SmTableComponent} from '../sm-table/sm-table.component';

@Component({
  selector: 'app-sm-home-page',
  templateUrl: './sm-home-page.component.html',
  styleUrls: ['./sm-home-page.component.css']
})
export class SmHomePageComponent implements OnInit {
  // it contains all rows for the shown columns ["Tests", "Status"]
  myTableData = {};
  objectKey = Object.keys;
  gettingData = true;
  // it contains the columns that being displayed in the table
  columnNames: string[] = ["Tests"];
  test_case_comments = {};
  comment_test_cases = {};
  test_case_DEIs = {};
  // toggle sidebar visibility
  isSideMenuVisible = true;
  // it holds all rows for all columns
  allTableData = {};
  submissionsData = {};
  // it holds all columns
  allColumnData: string[] = [];
  ////////////////////////////////////////////////
  columnsToFilterMap = {"exec_state": {}, "fstatus": {}, "Test Owner": {}, "DEI": {}};
  columnsToFilterVisibility = {"exec_state": {}, "fstatus": {}, "Test Owner": {}, "DEI": {}};

  @ViewChild(SmTableComponent) smTableChild;

  constructor( private _getJsonService: GetJsonService ) { }

  ngOnInit() {
  }

  updateTable(newParams: string) {
    console.log("updating...");
    if (newParams === "" || newParams === null || newParams === undefined) return;
    this.gettingData = true;
    this.emptyAllData();
    this._getJsonService.getJsonTable(newParams).subscribe(data => {
      let once: boolean = true;
      for (let i in data) {
        // iterates over each submission
        let curData = data[i]['test_instances'];

        this.submissionsData[ data[i]['name'] ] = {
          'TOTAL': data[i]['test_instance_counts']['TOTAL'],
          'PASSED': data[i]['test_instance_counts']['PASSED'],
          'FAILED': data[i]['test_instance_counts']['FAILED']
        };
        this.columnNames.push(data[i]['name']);
        for (let j in curData) {
          let curTestCase = curData[j];
          let test_name: string = curTestCase['test_name'];
          let test_comments = curTestCase['notes'];

          // add test case test_case_comments
          if (this.test_case_comments.hasOwnProperty(test_name) === false) this.test_case_comments[test_name] = {};
          this.test_case_comments[test_name][i] = test_comments;
          // for each comment attach cur test case
          test_comments.forEach( item => {
            if (this.comment_test_cases.hasOwnProperty(item['id']) === false) {
              this.comment_test_cases[item['id']] = [];
            }
            this.comment_test_cases[item['id']].push({'test_name': test_name, 'status_index': i});
          });

          let test_DEIs = curTestCase['attached_dei_gids'];
          test_DEIs.push("cq:dts0101291211");
          // add test case DEIs
          if (this.test_case_DEIs.hasOwnProperty(test_name) === false) this.test_case_DEIs[test_name] = {};
          this.test_case_DEIs[test_name][i] = test_DEIs;

          if (!this.myTableData.hasOwnProperty(test_name)) {
            // if this test cases wasn't seen before
            this.myTableData[test_name] = new Array(data.length);
          }
          let exec_status = curTestCase['exec_state'];
          let f_status = curTestCase['fstatus'];

          f_status = this.getUniqueSubSentences(f_status);
          this.myTableData[test_name][i] = {
            'exec_state': exec_status,
            'fstatus': f_status
          };

          // then it's pushed to allTableData Object
          if (!this.allTableData.hasOwnProperty(test_name)) {
            this.allTableData[test_name] = new Array(data.length);
          }

          let temp = {};
          for (let key in curTestCase) {
            var preparedData = curTestCase[key];
            temp[key] = preparedData;
            if (once) {
              // saves all the columns
              this.allColumnData.push(key);
            }
            if (key !== 'fstatus' && this.columnsToFilterMap.hasOwnProperty(key)) {
              if(this.columnsToFilterMap[key].hasOwnProperty(preparedData)) {
                this.columnsToFilterMap[key][preparedData]++;
              } else {
                this.columnsToFilterMap[key][preparedData] = 1;
                this.columnsToFilterVisibility[key][preparedData] = true;
              }
            }
          }
          this.allTableData[test_name][i] = temp;
          once = false;
        }
      }
      this.columnNames.push("Comment");
      this.columnNames.push("DEI");
      this.columnNames.push("Test Owner");
      this.columnNames.push("Tags");
      for (let key in this.myTableData) {
        let curRow = this.myTableData[key];
        for (let index = 0; index < curRow.length; index++) {
          if (!this.columnsToFilterMap['Test Owner'].hasOwnProperty("---")) {
            this.columnsToFilterMap['Test Owner']["---"] = 1;
            this.columnsToFilterVisibility['Test Owner']["---"] = true;
          } else {
            this.columnsToFilterMap['Test Owner']["---"]++;
          }

          if (curRow[index] === undefined || curRow[index] === null) {
            if (!this.columnsToFilterMap['fstatus'].hasOwnProperty("---")) {
              this.columnsToFilterMap['fstatus']["---"] = 0;
            }
            if (this.columnsToFilterMap['exec_state'].hasOwnProperty("NO STATUS")) {
              this.columnsToFilterMap['exec_state']["NO STATUS"]++;
              this.columnsToFilterMap['fstatus']["---"]++;
              curRow[index] = {
                "exec_state": "NO STATUS",
                "fstatus": ["---"]
              };
            } else {
              this.columnsToFilterMap['exec_state']["NO STATUS"] = 1;
              this.columnsToFilterMap['fstatus']["---"]++;
              // marks the rows that have all values of status as visible
              this.columnsToFilterVisibility['exec_state']["NO STATUS"] = true;
              curRow[index] = {
                "exec_state": "NO STATUS",
                "fstatus": ["---"]
              };
            }
          }
        }
      }
      this.columnsToFilterVisibility['exec_state']["PASSED"] = false;
      this.gettingData = false;
    });
  }

  private emptyAllData() {
    this.myTableData = {};
    this.allTableData = {};
    this.allColumnData = [];
    this.columnNames = ["Tests"];
    this.isSideMenuVisible = true;
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
        if (this.columnsToFilterMap['fstatus'].hasOwnProperty(splitter[i])) {
          this.columnsToFilterMap['fstatus'][splitter[i]]++;
        } else {
          this.columnsToFilterMap['fstatus'][splitter[i]] = 1;
          this.columnsToFilterVisibility['fstatus'][splitter[i]] = true;
        }
      }
      mp[splitter[i]] = 1;
    }
    return ans;
  }
  onFiltering() {
    console.log("Updating Child..");
    this.smTableChild.updateSmallTable(true, 0);
  }
  scrollDown1PX() {
    window.scrollTo(window.scrollX+1, window.scrollY+1);
  }
}
