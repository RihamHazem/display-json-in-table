import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectContainerComponent} from 'ngx-drag-to-select';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  selectedTab = {'i': 0, 'j': 0};
  selectedDocuments = [];
  sortingOrder = {};
  searchMode = false;
  curInput: string = "";
  allConstTable = [];
  tabCounter = 0;
  myIndex = -1;
  closeResult: string;

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
  isCommentSelected: any[] = [];
  constructor(private modalService: NgbModal) {
    this.heightWindow = (window.innerHeight - 110).toString();
  }
  ngOnInit() {
    this.updateSmallTable(true, 0);
  }
  deselectAll() {
    this.selectContainer.clearSelection();
    this.isStatusSelected = [];
    this.isTestSelected = [];
  }
  public setTestSelected(i) {
    this.myIndex = -1;
    this.isTestSelected[i] = true;
  }
  public setCommentSelected(i) {
    this.isCommentSelected[i] = true;
  }
  public setStatusSelected(i, j) {
    this.myIndex = j;
    if (this.isStatusSelected[i] === undefined || this.isStatusSelected[i] === null)
      this.isStatusSelected[i] = [];
    this.isStatusSelected[i][j] = true;
  }
  isSelectedDocEmpty(isTest) {
    if (isTest === -1) {
      return this.selectedDocuments.filter((item) => item.hasOwnProperty('test') === true).length === 0;
    }
    else {
      return this.selectedDocuments.filter((item) => {
        return item.hasOwnProperty('status') === true && item['id'] === isTest;
      }).length === 0;
    }
  }
  newWindowBaseUrl = 'http://regweb/regression_web/php/browse_php/browse_multi.php?';
  public openTestExplorer(testName) {
    let selectedStatus = this.selectedDocuments.filter(item=>item.hasOwnProperty('status'));
    let args = "";
    if (selectedStatus.length === 0) {
      args += "dirs[]=" + this.allTableData[testName][0]['exec_gpath'].slice(3) + '&';
    }
    for (let i in selectedStatus) {
      let idx = -1;
      for (let j in this.allTableData[selectedStatus[i]['testName']]) {
        if (this.allTableData[selectedStatus[i]['testName']][j] !== null &&
          this.allTableData[selectedStatus[i]['testName']][j] !== undefined) {
          idx = Number(j);
          break;
        }
      }
      if (idx === -1)
        continue;
      args += "dirs[]=" + this.allTableData[selectedStatus[i]['testName']][idx]['exec_gpath'].slice(3) + '&';
    }
    console.log(args);
    window.open(this.newWindowBaseUrl + args, "_blank");
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
  tabs = [];
  showPopUpTableTest(testName) {
    this.isSubTableVisible = true;
    this.curRow = this.allTableData[testName];
    let cnt = 0;
    this.tabs = [];
    let selectedTests = this.selectedDocuments.filter(item=>item.hasOwnProperty('test'));
    for (let i in selectedTests) {
      for (let j in selectedTests[i]['test']['Data']) {
        if (selectedTests[i]['test']['Data'][j]['Status'] !== 'NO STATUS') {
          this.tabs.push({'testName': selectedTests[i]['test']['Tests'], 'val': "Tab "+(++cnt), 'i': Number(i), 'j': Number(j)});
        }
      }
    }
    let once = true;
    for (let i in this.curRow) {
      if (this.curRow[i]['Status'] !== 'NO STATUS' && once) {
        this.selectedTab = {'i': 0, 'j': Number(i)};
        once = false;
        if (selectedTests.length === 0) {
          this.tabs.push({'testName': testName, 'val': "Tab "+(++cnt), 'i': 0, 'j': Number(i)});
        }
      }
    }
    this.tabCounter = 0;
  }
  showPopUpTableStatus(testName) {
    this.isSubTableVisible = true;
    this.curRow = this.allTableData[testName];
    let cnt = 0;
    this.tabs = [];
    let selectedStatus = this.selectedDocuments.filter(item=>item.hasOwnProperty('status'));
    console.log(selectedStatus);
    let ID = -1;
    for (let i in selectedStatus) {
      for (let j in selectedStatus[i]['status']['Data']) {
        if (selectedStatus[i]['status']['Data'][j]['Status'] !== 'NO STATUS' && selectedStatus[i]['id'] === Number(j)) {
          if (ID === -1)
            ID = selectedStatus[i]['id'];
          this.tabs.push({'testName': selectedStatus[i]['status']['Tests'], 'val': "Tab "+(++cnt), 'i': Number(i), 'j': Number(j)});
        }
      }
    }
    let once = true;
    for (let i in this.curRow) {
      if (this.curRow[i]['Status'] !== 'NO STATUS' && (ID === -1 || ID === Number(i)) && once) {
        this.selectedTab = {'i': 0, 'j': Number(i)};
        once = false;
        if (selectedStatus.length === 0) {
          this.tabs.push({'testName': testName, 'val': "Tab "+(++cnt), 'i': 0, 'j': Number(i)});
        }
      }
    }
    this.tabCounter = 0;
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
    this.filteredTable = this.allConstTable.filter(item => item['Tests'].indexOf(this.curInput) !== -1);
  }

  public updateSmallTable(order, indxCol) {
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
  comment = {};
  open(content, testName) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      let selectedComments = this.selectedDocuments.filter(item=>item.hasOwnProperty('comment'));
      if (selectedComments.length === 0) {
        this.comment[testName] = result;
      }
      for (let selected in selectedComments) {
        this.comment[ selectedComments[selected]['comment'] ] = result;
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
