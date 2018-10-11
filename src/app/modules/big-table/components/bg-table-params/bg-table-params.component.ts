import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bg-table-params',
  templateUrl: './bg-table-params.component.html',
  styleUrls: ['./bg-table-params.component.css']
})
export class BgTableParamsComponent implements OnInit {
  @Output() tableParam = new EventEmitter<string>();
  query = "pattern=find_run_submissions -q \"submit_time>='2018-10-01' and submitter='rabdelgh'\"";
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
