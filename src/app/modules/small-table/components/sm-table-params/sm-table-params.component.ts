import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sm-table-params',
  templateUrl: './sm-table-params.component.html',
  styleUrls: ['./sm-table-params.component.css']
})
export class SmTableParamsComponent implements OnInit {
  @Output() tableParam = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  tellParentNewParams(event, box) {
    if (event.keyCode == 13) { // user pressed enter
      event.preventDefault();
      console.log(box);
      this.tableParam.emit(box);
    }
  }

}
