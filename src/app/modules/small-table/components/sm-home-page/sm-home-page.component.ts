import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../../../shared/get-json.service';

@Component({
  selector: 'app-sm-home-page',
  templateUrl: './sm-home-page.component.html',
  styleUrls: ['./sm-home-page.component.css']
})
export class SmHomePageComponent implements OnInit {
  // it contains all rows for the shown columns ["Tests", "Status"]
  tableData: any[] = [];
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
          if (curData[j]['fstatus'] === null || curData[j]['fstatus'] === undefined) {
            f_status = "---";
          } else {
            f_status = this.getUniqueSubSentences(curData[j]['fstatus']);
          }
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
          if (this.map_fStatus.hasOwnProperty(f_status)) {
            // it counts the fStatus value so that it would be used later for filtering the row's of the table
            this.map_fStatus[f_status]++;
          } else {
            this.map_fStatus[f_status] = 1;
            this.fStatusVisibility[f_status] = true;
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
    });
  }
  constructTable() {
    this.allTableData = {};
    this.allColumnData = [];
    this._getJsonService.getJsonSmallTable().subscribe(data => {
      let ourData = data[0]['test_instances'];
      let once = true;
      let oneTime = true;
      // extracts from the JSON only three columns from the test instances's key: "test name", "exec state" and "f status"
      for (let index in ourData) {
        let test_name: string = ourData[index]['test_name'];
        this.map_test_name[test_name] = index;
        let exec_state: string[] = [];
        let f_status: string[] = [];
        for (let i in data) {
          let cur_exec_status = data[i]['test_instances'][index]['exec_state'];
          exec_state.push(cur_exec_status);
          if (this.map_status.hasOwnProperty(cur_exec_status)) {
            // it counts the status value so that it would be used later for filtering the row's of the table
            this.map_status[cur_exec_status]++;
          } else {
            // it sets the status value to 1.
            this.map_status[cur_exec_status] = 1;
            // marks the rows that have all values of status as visible
            this.statusVisibility[cur_exec_status] = true;
          }

          let cur_fStatus;
          if (data[i]['test_instances'][index]['fstatus'] === null || data[i]['test_instances'][index]['fstatus'] === undefined) {
            cur_fStatus = "---";
            f_status.push(cur_fStatus);
          } else {
            cur_fStatus = this.getUniqueSubSentences(data[i]['test_instances'][index]['fstatus']);
            f_status.push(cur_fStatus);
          }
          if (this.map_fStatus.hasOwnProperty(cur_fStatus)) {
            // it counts the fStatus value so that it would be used later for filtering the row's of the table
            this.map_fStatus[cur_fStatus]++;
          } else {
            this.map_fStatus[cur_fStatus] = 1;
            this.fStatusVisibility[cur_fStatus] = true;
          }
          if (oneTime)
            this.columnNames.push("Status");
        }
        oneTime = false;
        // it pushes the collected data at the tableData object
        this.tableData.push({
          'Tests': test_name,
          'Status': exec_state,
          'fStatus': f_status
        });
        // saves also all the data of all columns to be used in showing more info about the row
        // then it's pushed to allTableData Object
        this.allTableData[test_name] = [];
        for (let i in data) {
          let temp = {};
          for (let key in data[i]['test_instances'][index]) {
            if (key === 'id' || key === 'test_name' || key === 'test_id') {
              continue;
            }
            temp[key] = data[i]['test_instances'][index][key];
            if (once) {
              // saves all the columns
              this.allColumnData.push(key);
            }
          }
          this.allTableData[test_name].push(temp);
          once = false;
        }
      }
      console.log(this.allTableData);
    });
  }

  public getUniqueSubSentences(str: string) {
    let splitter = str.split(',');
    let mp = {};
    let ans: string[] = [];
    for (let i in splitter) {
      if (!mp.hasOwnProperty(splitter[i])) {
        ans.push(splitter[i]);
      }
      mp[splitter[i]] = 1;
    }
    return ans;
  }
}
