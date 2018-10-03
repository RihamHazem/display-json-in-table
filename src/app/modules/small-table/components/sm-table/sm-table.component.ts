import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectContainerComponent} from 'ngx-drag-to-select';

@Component({
  selector: 'app-sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.css']
})
export class SmTableComponent implements OnInit {
  heightWindow = "0";
  @Input() tableData = {};
  @Input() columnNames: string[] = [];
  @Input() allTableData = {};
  @Input() allColumnData: any[] = [];
  @Input() rowVisibility = {};
  @Input() map_test_name = {};
  filteredTable = [];
  curRow: any[] = [];
  isSubTableVisible = false;
  isTestSelected = [];
  isStatusSelected = [];
  selectedMultiple = false;
  selectedTab = -1;
  selectedDocuments = [];
  sortingOrder = {};
  searchMode = false;
  curInput: string = "";
  allConstTable = [];
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;

  constructor() {
    this.heightWindow = (window.innerHeight - 110).toString();
  }
  ngOnInit() {
    this.updateSmallTable(true, 0);
  }
  deselectAll() {
    console.log("ESCAPE");
    this.selectContainer.clearSelection();
    this.isStatusSelected = [];
    this.isTestSelected = [];
  }
  public setTestSelected(i) {
    if (this.selectedMultiple) {
      this.isTestSelected = [];
      return;
    }
    this.isTestSelected[i] = true;
  }

  public setStatusSelected(i, j) {
    if (this.selectedMultiple) {
      this.isStatusSelected = [];
      return;
    }
    if (this.isStatusSelected[i] === undefined || this.isStatusSelected[i] === null)
      this.isStatusSelected[i] = [];
    this.isStatusSelected[i][j] = true;
  }
  public showMessage(message) {
    console.log("Message: ", message);
    this.deselectAll();
  }
  // this function is responsible for hiding the pop up sub-table *that contains all info of the row* and also the context menu
  hideAllPopUps() {
    this.isSubTableVisible = false;
    this.deselectAll();
  }
  // this function responsible for showing the pop up sub-table
  showPopUpTable(testName) {
    this.isSubTableVisible = true;
    this.curRow = this.allTableData[testName];
    this.selectTab(testName, 0);
  }
  selectTab(testName: string, index: number) {
    this.selectedTab = index;
    this.curRow = this.allTableData[testName];
  }
  changeSortingOrder(colIndex: number) {
    if (this.sortingOrder[colIndex] === "▼") {
      this.sortingOrder[colIndex] = "▲";
      this.updateSmallTable(false, colIndex);
    } else {
      this.sortingOrder[colIndex] = "▼";
      this.updateSmallTable(true, colIndex);
    }
  }
  enableSearchMode() {
    this.searchMode = true;
  }
  disableSearchMode() {
    this.searchMode = false;
    this.filteredTable = this.allConstTable;
    this.curInput = "";
  }
  applyChange() {
    if (this.curInput === "") return;
    console.log(this.curInput);
    this.filteredTable = this.allConstTable.filter(item => item['Tests'].indexOf(this.curInput) !== -1);
  }

  public updateSmallTable(order, indxCol) {
    console.log(this.tableData);
    this.filteredTable.length = 0;
    // order = true means increasing, false means decreasing
    for (let key in this.tableData) {
      let allTrue = false;
      for (let index in this.tableData[key]) {
        let subTrue = false;
        for (let fs in this.tableData[key][index]["fStatus"]) {
          subTrue = subTrue || (this.rowVisibility["fStatus"][ this.tableData[key][index]["fStatus"][fs] ] === true);
        }
        allTrue = allTrue || (this.rowVisibility["Status"][ this.tableData[key][index]["Status"] ] === true && subTrue);
      }
      if (allTrue)
        this.filteredTable.push({"Tests": key, "Data": this.tableData[key]});
    }
    if (indxCol === 0) {
      this.filteredTable = this.testSort(order, this.filteredTable);
    } else if (indxCol >= 1) {
      this.filteredTable = this.statusSort(order, this.filteredTable, indxCol - 1);
    }
    this.allConstTable = this.filteredTable
    return this.filteredTable;
  }

  private testSort(order: boolean, newArr: any[]) {
    newArr.sort();
    if (!order) {
      newArr.reverse();
    }
    return newArr;
  }
  private statusSort(order: boolean, newArr: any[], statusIndex: number) {
    newArr.sort(function (a: string, b: string) {
      return a['Data'][statusIndex]['Status'] < b['Data'][statusIndex]['Status']? -1 : 1;
    });
    if (!order) {
      newArr.reverse();
    }
    return newArr;
  }
}
