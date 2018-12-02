import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectContainerComponent} from 'ngx-drag-to-select';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GetJsonService} from '../../../../shared/get-json.service';

@Component({
  selector: 'app-sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.css']
})
export class SmTableComponent implements OnInit {
  @Input() tableData = {};
  @Input() columnNames: string[] = [];
  @Input() allTableData = {};
  @Input() allColumnData: any[] = [];
  @Input() rowVisibility = {};
  @Input() comments = {};
  heightWindow = "0";
  filteredTable = [];
  curRow: any[] = [];
  isSubTableVisible = false;
  selectedTab = {'i': 0, 'j': 0};
  selectedDocuments = [];
  sortingOrder = {};
  searchMode = false;
  curInput: string = "";
  allConstTable = [];
  tabCounter = 0;
  myIndex = -1;
  JSONstringify = JSON.stringify;
  objectKeys = Object.keys;
  newWindowBaseUrl = 'http://regweb/regression_web/php/browse_php/browse_multi.php?';

  @ViewChild('selectContainer') selectContainer: SelectContainerComponent;

  constructor(private modalService: NgbModal, private _getJsonService: GetJsonService) {
    this.heightWindow = (window.innerHeight - 110).toString();
  }

  ngOnInit() {
    this.updateSmallTable(true, 0);
  }

  deselectAll() {
    this.selectContainer.clearSelection();
  }

  public setTestSelected(row) {
    this.myIndex = -1;
    this.selectContainer.selectItems((item) => {
      return item.hasOwnProperty('test') === true && item['test'] === row;
    });
  }

  public setCommentSelected(test) {
    this.selectContainer.selectItems((item) => {
      return item.hasOwnProperty('comment') === true && item['comment'] === test;
    });
  }
  public setStatusSelected(row, id) {
    this.myIndex = id;
    this.selectContainer.selectItems((item) => {
      return item.hasOwnProperty('status') === true && item['status'] === row && item['id'] === id;
    });
  }

  public openTestExplorerWindow(testName) {
    let selectedStatus = this.selectedDocuments.filter(item => item.hasOwnProperty('status'));
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
    window.open(this.newWindowBaseUrl + args, "_blank");
  }

  public showMessage(message) {
    console.log("Message: ", message);
    this.deselectAll();
  }

  // this function is responsible for hiding the pop up sub-table *that contains all info of the row* and also the context menu
  hideAllPopUps() {
    this.isSubTableVisible = false;
    this.isShowCommentsMode = false;
    this.deselectAll();
  }

  // this function responsible for showing the pop up sub-table
  tabs = [];

  showPopUpTableTest(testName) {
    this.isSubTableVisible = true;
    this.curRow = this.allTableData[testName];
    let cnt = 0;
    this.tabs = [];
    let selectedTests = this.selectedDocuments.filter(item => item.hasOwnProperty('test'));
    for (let i in selectedTests) {
      for (let j in selectedTests[i]['test']['Data']) {
        if (selectedTests[i]['test']['Data'][j]['exec_state'] !== 'NO STATUS') {
          this.tabs.push({'testName': selectedTests[i]['test']['Tests'], 'val': "Tab " + (++cnt), 'i': Number(i), 'j': Number(j)});
        }
      }
    }
    let once = true;
    for (let i in this.curRow) {
      if (this.curRow[i]['exec_state'] !== 'NO STATUS' && once) {
        this.selectedTab = {'i': 0, 'j': Number(i)};
        once = false;
        if (selectedTests.length === 0) {
          this.tabs.push({'testName': testName, 'val': "Tab " + (++cnt), 'i': 0, 'j': Number(i)});
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
    let selectedStatus = this.selectedDocuments.filter(item => item.hasOwnProperty('status'));
    let ID = -1;
    for (let i in selectedStatus) {
      for (let j in selectedStatus[i]['status']['Data']) {
        if (selectedStatus[i]['status']['Data'][j]['exec_state'] !== 'NO STATUS' && selectedStatus[i]['id'] === Number(j)) {
          if (ID === -1)
            ID = selectedStatus[i]['id'];
          this.tabs.push({'testName': selectedStatus[i]['status']['Tests'], 'val': "Tab " + (++cnt), 'i': Number(i), 'j': Number(j)});
        }
      }
    }
    let once = true;
    for (let i in this.curRow) {
      if (this.curRow[i]['exec_state'] !== 'NO STATUS' && (ID === -1 || ID === Number(i)) && once) {
        this.selectedTab = {'i': 0, 'j': Number(i)};
        once = false;
        if (selectedStatus.length === 0) {
          this.tabs.push({'testName': testName, 'val': "Tab " + (++cnt), 'i': 0, 'j': Number(i)});
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
    console.log("Updating small table");
    this.filteredTable.length = 0;
    // order = true means increasing, false means decreasing
    for (let key in this.tableData) {
      let allTrue = false;
      for (let index in this.tableData[key]) {
        let subTrue = false;
        for (let fs in this.tableData[key][index]["fstatus"]) {
          subTrue = subTrue || (this.rowVisibility["fstatus"][this.tableData[key][index]["fstatus"][fs]] === true);
        }
        allTrue = allTrue || (this.rowVisibility["exec_state"][this.tableData[key][index]["exec_state"]] === true && subTrue);
      }
      if (allTrue)
        this.filteredTable.push({"Tests": key, "Data": this.tableData[key]});
    }
    if (indxCol === 0) {
      this.filteredTable = this.testSort(order, this.filteredTable);
    } else if (indxCol >= 1) {
      this.filteredTable = this.statusSort(order, this.filteredTable, indxCol - 1);
    }
    this.allConstTable = this.filteredTable;
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
      return a['Data'][statusIndex]['exec_state'] < b['Data'][statusIndex]['exec_state'] ? -1 : 1;
    });
    if (!order) {
      newArr.reverse();
    }
    return newArr;
  }

  showError = false;
  loading = false;
  errorResult = "Please fill all fields";
  shownComments = [];
  attachComments = [];
  isShowCommentsMode = false;
  isAttachTestCasesMode = false;
  showInputs = {};
  updateComment = {};
  showUpdateErrors = {};
  checkedComments = {};
  attachError = false;
  submittedAttach = false;
  isLoadingAttach = false;
  showComment() {
    this.isShowCommentsMode = true;
    this.shownComments = [];
    let selectedComments = this.selectedDocuments.filter(item => item.hasOwnProperty('comment') === true);
    for (let selected in selectedComments) {
      this.shownComments.push(this.comments[selectedComments[selected]['comment']]);
      for (let selected_comm in this.comments[selectedComments[selected]['comment']]) {
        if (this.showInputs.hasOwnProperty(selected) === false) this.showInputs[selected] = {};
        if (this.updateComment.hasOwnProperty(selected) === false) this.updateComment[selected] = {};
        if (this.showUpdateErrors.hasOwnProperty(selected) === false) this.showUpdateErrors[selected] = {};
        this.updateComment[selected][selected_comm] = "Update Comment";
        this.showInputs[selected][selected_comm] = false;
        this.showUpdateErrors[selected][selected_comm] = false;
      }
    }
  }
  attachCommentWindow(attach_comment) {
    this.attachComments = [];
    let commentMap = {}; // filter comments to get rid of duplicates
    let selectedComments = this.selectedDocuments.filter(item => item.hasOwnProperty('comment') === true); // list contains test cases that has all comments
    for (let selected in selectedComments) {
      let curTestCase = this.comments[ selectedComments[selected]['comment'] ]; // getting comments of the current test case
      for (let comm in curTestCase) {
        if (commentMap.hasOwnProperty(curTestCase[comm]['id']) === false) {
          commentMap[ curTestCase[comm]['id'] ] = true;
          this.attachComments.push( curTestCase[comm] );
        }
      }
    }
    this.attachCommentList(attach_comment);
  }
  attachCommentSubmission(modal) {
    // in this step I've already chosen the comments and It's time to choose test cases
    this.isAttachTestCasesMode = true;
    modal.close();
  }
  sendAttachedTestCases() {
    this.isAttachTestCasesMode = false;
    this.isLoadingAttach = true;
    let selectedTestCases = this.selectedDocuments.filter((item) => item.hasOwnProperty('test') === true);
    let test_case_ids = [];
    let note_ids = [];
    for (let selected in selectedTestCases) {
      let testName = selectedTestCases[selected]['test']['Tests'];
      test_case_ids.push(this.allTableData[ testName ][0]['id']);
    }
    let checkedCommentsData = [];
    for (let selected in this.attachComments) {
      if (this.checkedComments[selected] === true) {
        note_ids.push(this.attachComments[selected]['id']);
        checkedCommentsData.push(this.attachComments[selected]);
      }
    }
    let params = {
      "note_ids": note_ids,
      "test_instance_ids": test_case_ids,
      "actor": "oragi" /// needs to be dynamic
    };
    this._getJsonService.attachNotes(params).subscribe((data) => {
      this.isLoadingAttach = false;
      if (data.hasOwnProperty("result") && data["result"] === "OK") {
        // success
        console.log("Comments Attached =D");
        this.submittedAttach = true;
        this.attachError = false;
        // attach these comments to selected test cases on the UI
        for (let test_case in selectedTestCases) {
          let testName = selectedTestCases[test_case]['test']['Tests'];
          checkedCommentsData.forEach(item => this.comments[testName].push(item));
        }
      } else {
        // error
        console.log("ERROR", data);
        this.attachError = true;
        this.isLoadingAttach = false;
      }
    }, error1 => {
      // error
      console.log("ERROR", error1);
      this.attachError = true;
      this.isLoadingAttach = false;
    });
  }
  sendComment(txt_val, user_val, selectedComments, modal) {
    let selected_ids = []; // selected test cases ids
    for (let selected in selectedComments) {
      let testName = selectedComments[selected]['comment'];
      selected_ids.push(this.allTableData[ testName ][0]['id']);
    }
    let params = {
      "note": {
        'creator': user_val,
        'type': 'GENERAL',
        'content': txt_val
      },
      "attached_test_instance_ids": selected_ids
    };
    this._getJsonService.createNote(params).subscribe(data => {
      console.log(data);
      // if the request is successful then close the modal
      if (data.hasOwnProperty("result") && data["result"] === "OK") {
        // add comments to the table
        for (let selected in selectedComments) {
          let testName = selectedComments[selected]['comment'];
          if (!this.comments.hasOwnProperty(testName)) {
            this.comments[testName] = [];
          }
          this.comments[testName].push({
            'content': txt_val,
            'id': data['content'],
            'type': 'GENERAL',
            'creator': user_val
          });
        }
        modal.close();
      } else {
        console.log("ERROR", data);
        this.showError = true;
        this.errorResult = "Please, Make sure that the entered data is correct!";
      }
      this.loading = false;
    }, error1 => {
      console.log("ERROR", error1);
      this.showError = true;
      this.errorResult = "Please, Make sure that the entered data is correct!";

      this.loading = false;
    });
  }

  addNewComment(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.deselectAll();
      this.showError = false;
    }, () => {
      console.log(`Dismissed`);
      this.showError = false;
    });
  }
  attachCommentList(attach_comment) {
    for (let selected in this.attachComments) { // empty checked comments
      this.checkedComments[selected] = false;
    }
    this.modalService.open(attach_comment, {ariaLabelledBy: 'modalComm-basic-title'}).result.then(() => {
      this.deselectAll();
    }, () => {
      console.log(`Dismissed`);
    });
  }
  commentSubmission(modal, txt_val, user_val) {
    // submit new comment
    if (txt_val === '' || user_val === '') {
      this.errorResult = "Please fill all fields";
      this.showError = true;
      return;
    }
    // *show loader to indicate that there's some processing*
    this.loading = true;
    let selectedComments = this.selectedDocuments.filter(item => item.hasOwnProperty('comment') === true);
    this.sendComment(txt_val, user_val, selectedComments, modal);
    this.showError = false;
  }
  updateCommentMode(cur_tab, cur_comment) {
    // shows the inputs to edit the comment content
    if (this.showInputs[cur_tab][cur_comment] === false) { // begin editing mode
      this.updateComment[cur_tab][cur_comment] = "Submit Changes";
      this.showInputs[cur_tab][cur_comment] = true;
    } else { // submit edits
      this.updateComment[cur_tab][cur_comment] = "loading..";
      console.log(this.shownComments[cur_tab][cur_comment]['content']);
      this.updateCommentContent({
        "note_id": this.shownComments[cur_tab][cur_comment]['id'],
        "content": this.shownComments[cur_tab][cur_comment]['content'],
        "actor": this.shownComments[cur_tab][cur_comment]['creator']
      }, cur_tab, cur_comment);
    }
  }
  updateCommentContent(params, cur_tab, cur_comment) {
    // sending updates to the service
    this._getJsonService.updateNote(params).subscribe(data => {
      if (data.hasOwnProperty("result") && data["result"] === "OK") {
        // success
        console.log("Comment Updated =D");
        this.updateComment[cur_tab][cur_comment] = "Update Comment";
        this.showInputs[cur_tab][cur_comment] = false;
        this.showUpdateErrors[cur_tab][cur_comment] = false;
      } else {
        console.log(data);
        this.updateComment[cur_tab][cur_comment] = "Submit Changes";
        this.showUpdateErrors[cur_tab][cur_comment] = true;
      }
    }, (error1) => {
      console.log(error1);
      this.updateComment[cur_tab][cur_comment] = "Submit Changes";
      this.showUpdateErrors[cur_tab][cur_comment] = true;
    });
  }
//  -------------------------------------------------------------------------
//  Test Context Menu
  public applyColor() {
    // body
  }
  public showHistory() {
    // body
  }
  public copyTestNames() {
    // body
  }
  public hideTest() {
    // body
  }
//  -------------------------------------------------------------------------
//  Status Context Menu
  public selectColorTagGreen() {
    // body
  }
  public selectColorTagYellow() {
    // body
  }
  public selectColorTagRed() {
    // body
  }
  public openTestExplorer() {
    // body
  }
  public gridJobStatus() {

  }
  public viewQLog() {

  }
  public monitorQLog() {

  }
  public killSelectedJobs() {

  }
  public runCommandOpenTerminal() {

  }
  public runCommandOpenTerminalQuick() {

  }
  public copyFailReasonsToTags() {

  }
  public openClickBuild() {

  }
  public openVNC() {

  }
}
