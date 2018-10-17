import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {SelectContainerComponent} from 'ngx-drag-to-select';
import { Chart, ChartData, Point } from "chart.js";
import {range} from 'rxjs';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.css']
})
export class SubmissionsTableComponent implements OnInit, AfterViewInit {
  @Input() submissionData = {};
  columns = ["TOTAL", "PASSED", "FAILED"];
  objectKeys = Object.keys;
  selectedDocuments = [];
  tabs = ["Tab 1", "Tab 2", "Tab 3"];
  isPieOpen = false;

  @ViewChild('selectContainer') selectContainer: SelectContainerComponent;
  elem: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.selectContainer.update();
  }
  constructor() { }

  ngOnInit() {
  }
  myCharts = {};
  chartCanvas = {};
  ngAfterViewInit() {
    for (let index in this.submissionData) {
      this.chartsUpdate(index);
    }
  }
  public setSubSelected(row) {
    this.selectContainer.selectItems((item) => item === row);
  }
  public printSelectedSubmissions() {
    for (let selectedDocumentsKey in this.selectedDocuments) {
      console.log(this.selectedDocuments[selectedDocumentsKey]);
    }
  }
  updateContainer() {
    console.log(this.selectContainer);
    this.selectContainer.update();
  }
  chartsUpdate(index) {
    this.chartCanvas[index] = document.createElement("canvas");
    this.chartCanvas[index].id = 'myChart'+index;
    this.chartCanvas[index].width = 300;
    this.chartCanvas[index].height = 200;
    let ctx = this.chartCanvas[index].getContext('2d');
    this.myCharts[index] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.columns,
        datasets: [{
          label: '# of Votes',
          data: [this.submissionData[index]["TOTAL"], this.submissionData[index]["PASSED"], this.submissionData[index]["FAILED"]],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false
      }
    });
    this.chartCanvas[index].appendChild(document.createTextNode(this.myCharts[index]));
    console.log(this.chartCanvas);
  }
  openPieCharts() {
    console.log(this.selectedDocuments);
    for (let selectedDocumentsKey in this.selectedDocuments) {
      this.elem = document.getElementById(this.selectedDocuments[selectedDocumentsKey]);
      this.elem.appendChild(this.chartCanvas[this.selectedDocuments[selectedDocumentsKey]]);
    }
    this.isPieOpen = true;
  }
  closePieCharts() {
    this.isPieOpen = false;
  }
}
