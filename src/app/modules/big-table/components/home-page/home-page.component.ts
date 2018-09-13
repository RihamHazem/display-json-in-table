import {Component, OnInit} from '@angular/core';
import {GetJsonService} from "../../../../shared/get-json.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  tableData: any[] = [];

  columnNames: string[] = [];
  columnIndices: any = {};
  columnVisibility: boolean[];
  isSideMenuVisible: boolean = true;

  constructor(private _getJsonService: GetJsonService) {
    this.constructTableData();
  }

  ngOnInit() {
  }

  constructTableData() {
    this._getJsonService.getJson().subscribe(data => {
      let cnt: number = 0;
      for (let index in data) {
        let cur_row: any = {};
        for (let key in data[index]) {
          // adding the structure of the data
          if (index === "0") {
            if (key === "test_instance_counts") {
              for (let in_key in data[index][key]) {
                this.columnNames.push(in_key);
                this.columnIndices[in_key] = cnt;
                cnt += 1;
              }
            } else {
              this.columnNames.push(key);
              this.columnIndices[key] = cnt;
              cnt += 1;
            }
          }
          // constructing the data
          if (key === "test_instance_counts") {
            for (let in_key in data[index][key]) {
              if (data[index][key][in_key] === null || data[index][key][in_key] === undefined) {
                cur_row[in_key] = "___";
              } else
                cur_row[in_key] = data[index][key][in_key];
            }
          } else {
            if (data[index][key] === null || data[index][key] === undefined) {
              cur_row[key] = "___";
            } else
              cur_row[key] = data[index][key];
          }
        }
        this.tableData.push(cur_row);
      }
      this.columnVisibility = new Array(this.columnNames.length);
      this.columnVisibility.fill(false);
      this.columnVisibility[this.columnIndices["name"]] = true;
      this.columnVisibility[this.columnIndices["status"]] = true;

      console.log(this.columnIndices);
    });
  }

  hideSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

}
