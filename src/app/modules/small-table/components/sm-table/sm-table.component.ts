import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sm-table',
  templateUrl: './sm-table.component.html',
  styleUrls: ['./sm-table.component.css']
})
export class SmTableComponent implements OnInit {
  heightWindow = "0";
  @Input() tableData: any[] = [];
  @Input() columnNames: string[] = [];
  @Input() allTableData: any[] = [];
  @Input() allColumnData: any[] = [];
  @Input() rowVisibility = {};
  @Input() map_test_name = {};
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
  showContextMenu(event, index) {
    event.preventDefault();
    this.pos_x = event.clientX.toString();
    this.pos_y = event.clientY.toString();
    this.isContextMenuVisible = true;
    this.isSubTableVisible = false;
    this.curRow = this.allTableData[index];
  }
  // this function is responsible for hiding the pop up sub-table *that contains all info of the row* and also the context menu
  hideAllPopUps() {
    this.isContextMenuVisible = false;
    this.isSubTableVisible = false;
    console.log('left click');
  }
  // this function responsible for showing the pop up sub-table
  showPopUpTable() {
    this.isSubTableVisible = true;
    this.isContextMenuVisible = false;
  }
}
