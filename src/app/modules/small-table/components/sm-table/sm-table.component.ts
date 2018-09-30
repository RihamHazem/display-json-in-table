import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CancelContextMenuEvent, CloseContextMenuEvent, ContextMenuComponent, ContextMenuService} from 'ngx-contextmenu';

@Component({
  selector: 'app-sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.css']
})
export class SmTableComponent implements OnInit {
  heightWindow = "0";
  curSelected = -1;
  mouseDown = false;
  @Input() tableData = {};
  @Input() columnNames: string[] = [];
  @Input() allTableData = {};
  @Input() allColumnData: any[] = [];
  @Input() rowVisibility = {};
  @Input() map_test_name = {};
  @Input() fixedData = [];
  objectKey = Object.keys;
  curRow: any[] = [];
  isSubTableVisible = false;
  isTestSelected = [];
  isStatusSelected = [];
  isRowSelected = [];
  selectedMultiple = false;

  constructor(private contextMenuService: ContextMenuService) {
    this.heightWindow = (window.innerHeight - 110).toString();
  }

  ngOnInit() {
  }
  @ViewChild(ContextMenuComponent) public testMenu: ContextMenuComponent;
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
  public deselectAllTest() {
    this.isTestSelected = [];
  }
  public deselectAllStatus() {
    this.isStatusSelected = [];
  }
  public showMessage(message: string) {
    console.log(message);
  }
  // this function is responsible for hiding the pop up sub-table *that contains all info of the row* and also the context menu
  hideAllPopUps() {
    this.isSubTableVisible = false;
  }
  // this function responsible for showing the pop up sub-table
  showPopUpTable(testName) {
    console.log(testName);
    this.isSubTableVisible = true;
    this.curRow = this.allTableData[testName];
    this.curSelected = this.map_test_name[testName];
  }
  selectMultipleElements(elements) {
    console.log(this.testMenu);
    if (elements.which !== 1) {
      return;
    }
    if (this.selectedMultiple) {
      this.selectedMultiple = false;
      this.isRowSelected = [];
      return;
    }
    console.log(this.testMenu);
    this.selectedMultiple = true;
    let element = elements.target;
    this.mouseDown = true;
    let info = element.className.split('-');
    let i = info[1];
    this.isRowSelected[i] = true;
  }
  selectMultipleElementsMove(element: any) {
    if (this.mouseDown === false) return;
    let info = element.className.split('-');
    let i = info[1];
    this.isRowSelected[i] = true;
  }
  releaseClick() {
    this.mouseDown = false;
  }
}
