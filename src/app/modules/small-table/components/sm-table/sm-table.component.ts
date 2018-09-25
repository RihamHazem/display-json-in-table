import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.css']
})
export class SmTableComponent implements OnInit {
  heightWindow = "0";
  opacityBlue = -1;
  @Input() tableData: any[] = [];
  @Input() columnNames: string[] = [];
  @Input() allTableData = {};
  @Input() allColumnData: any[] = [];
  @Input() rowVisibility = {};
  @Input() map_test_name = {};
  objectKey = Object.keys;
  curRow: any[] = [];
  isContextMenuVisible = false;
  isSubTableVisible = false;
  pos_x = 0;
  pos_y = 0;

  constructor() {
    this.heightWindow = (window.innerHeight - 90).toString();
  }

  ngOnInit() {
  }
  // this function is responsible of showing the right-click context menu
  showContextMenu(event, testName) {
    event.preventDefault();
    this.pos_x = event.clientX.toString();
    this.pos_y = event.clientY.toString();
    this.isContextMenuVisible = true;
    this.isSubTableVisible = false;
    this.curRow = this.allTableData[testName];
    console.log(this.curRow);
    this.opacityBlue = this.map_test_name[testName];
  }
  // this function is responsible for hiding the pop up sub-table *that contains all info of the row* and also the context menu
  hideAllPopUps() {
    this.isContextMenuVisible = false;
    this.isSubTableVisible = false;
    console.log('left click');
    this.opacityBlue = -1;
  }
  // this function responsible for showing the pop up sub-table
  showPopUpTable() {
    this.isSubTableVisible = true;
    this.isContextMenuVisible = false;
    this.opacityBlue = -1;
  }
}
