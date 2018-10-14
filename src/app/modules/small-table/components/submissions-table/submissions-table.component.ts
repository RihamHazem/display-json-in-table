import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.css']
})
export class SubmissionsTableComponent implements OnInit {
  @Input() submissionData = {};
  columns = ["TOTAL", "PASSED", "FAILED"];
  objectKeys = Object.keys;
  constructor() { }

  ngOnInit() {
  }

}
