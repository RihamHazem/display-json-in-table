import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sm-table-params',
  templateUrl: './sm-table-params.component.html',
  styleUrls: ['./sm-table-params.component.css']
})
export class SmTableParamsComponent implements OnInit, AfterViewInit {
  query = "mars_id[]=93b5e230-bf36-11e8-bd04-751329575ff9&mars_id[]=4ca013d0-befe-11e8-989b-54c16d2a9ef4&action=explore";
  @Output() tableParam = new EventEmitter<string>();
  constructor() {
    let href_arr = window.location.href.split('?');
    if (href_arr.length > 1) {
      this.query = decodeURIComponent(href_arr[1]);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tableParam.emit(this.query);
  }

  tellParentNewParams(event) {
    if (event.keyCode == 13) { // user pressed enter
      event.preventDefault();
      console.log(this.query);
      this.tableParam.emit(this.query);
    }
  }

}
