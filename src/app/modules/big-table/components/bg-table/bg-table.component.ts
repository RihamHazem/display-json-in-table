import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './bg-table.component.html',
  styleUrls: ['./bg-table.component.css']
})
export class BgTableComponent implements OnInit {
  // it holds the rows of the json
  @Input() tableData: any[] = [];
  // it holds the data of one row only for the environment key
  @Input() environmentTableData = {};
  @Input() columnNames: string[] = [];
  @Input() environmentColumnNames: string[] = [];
  // holds the visibility status for all the columns
  @Input() columnVisibility: boolean[];
  heightWindow = "0";
  // holds the visibility status for the context menu
  isContextMenuVisible = false;
  // holds the visibility status for the sub-table
  isSubTableVisible = false;
  // holds info about the position of the context menu
  pos_x = 0;
  pos_y = 0;

  constructor() {
    this.heightWindow = (window.innerHeight - 110).toString();
  }

  ngOnInit() {
  }
  // it's responsible for showing the right-click context menu
  showContextMenu(event) {
    event.preventDefault();
    this.pos_x = event.clientX.toString();
    this.pos_y = event.clientY.toString();
    this.isContextMenuVisible = true;
    this.isSubTableVisible = false;
    console.log('right click', event);
  }
  // it's responsible for hiding the pop up sub-table *that contains the environment info* and also the context menu
  hideAllPopUps() {
    this.isContextMenuVisible = false;
    this.isSubTableVisible = false;
    console.log('left click');
  }
  // it's responsible for showing the pop up sub-table
  showPopUpTable() {
    this.isSubTableVisible = true;
    this.isContextMenuVisible = false;
  }
}
