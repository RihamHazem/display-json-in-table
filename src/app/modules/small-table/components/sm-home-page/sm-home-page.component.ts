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
  // it contains the columns that being displayed in the table
  columnNames: string[] = ["Tests", "Status", 'fStatus'];
  // toggle sidebar visibility
  isSideMenuVisible = true;
  // it holds the visibility of Status Field
  statusVisibility = {};
  // it holds the visibility of fStatus field
  fStatusVisibility = {};
  // it holds all rows for all columns
  allTableData: any[] = [];
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
    this.constructTable();
  }
  constructTable() {
    this._getJsonService.getJsonSmallTable().subscribe(data => {
      let ourData = data[0]['test_instances'];
      let once = true;
      // extracts from the JSON only three columns from the test instances's key: "test name", "exec state" and "f status"
      for (let index in ourData) {
        let test_name: string = ourData[index]['test_name'];
        this.map_test_name[test_name] = index;
        let exec_state: string = ourData[index]['exec_state'];
        if (this.map_status.hasOwnProperty(exec_state)) {
          // it counts the status value so that it would be used later for filtering the row's of the table
          this.map_status[exec_state]++;
        } else {
          // it sets the status value to 1.
          this.map_status[exec_state] = 1;
          // marks the rows that have all values of status as visible
          this.statusVisibility[exec_state] = true;
        }
        let f_status: string;
        if (ourData[index]['fstatus'] === null || ourData[index]['fstatus'] === undefined) {
          f_status = "---";
        } else {
          f_status = ourData[index]['fstatus'].toString().split(',')[0];
        }
        if (this.map_fStatus.hasOwnProperty(f_status)) {
          // it counts the fStatus value so that it would be used later for filtering the row's of the table
          this.map_fStatus[f_status]++;
        } else {
          this.map_fStatus[f_status] = 1;
          this.fStatusVisibility[f_status] = true;
        }
        // it pushes the collected data at the tableData object
        this.tableData.push({
          'Tests': test_name,
          'Status': exec_state,
          'fStatus': f_status,
          'fStatus2': f_status
        });
        // saves also all the data of all columns to be used in showing more info about the row
        // then it's pushed to allTableData Object
        let temp = {};
        for (let key in ourData[index]) {
          temp[key] = ourData[index][key];
          if (once) {
            // saves all the columns
            this.allColumnData.push(key);
          }
        }
        once = false;
        this.allTableData.push(temp);
      }
    });
  }
}
