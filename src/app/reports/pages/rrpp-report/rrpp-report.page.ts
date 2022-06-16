import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, registerables } from 'chart.js';
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { EventsService } from "src/app/shared/services/events.service";
import { ReportsService } from "../../services/reports.service";
Chart.register(...registerables);

@Component({
  selector: 'rrpp-report-page',
  templateUrl: 'rrpp-report.page.html',
  styleUrls: ['./rrpp-report.page.scss']
})
export class RrppReportPage implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  barChart: any; 
  events = [];

  constructor(
    private eventsService: EventsService,
    private reportsService: ReportsService,
    private loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    this.loadingHelper.present();
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getAllEvents().subscribe((response) => {
      this.events = response.data;
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  ngAfterViewInit() {
    this.loadBarChartMethod();
  }

  filterAction(event) {
    this.loadingHelper.present();
    this.reportsService.getRrppReport(event.value).subscribe((response) => {
      const data = response.data;
      const names = [];
      const totals = [];

      data.forEach(element => {
        names.push(element.fullName);
        totals.push(element.total);
      });
      this.barChart.destroy();
      this.loadBarChartMethod(names, totals);
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  loadBarChartMethod(dataX = [], dataY = []) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: dataX,
        datasets: [{
          label: '$ en comisiones',
          data: dataY,
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)',
            'rgba(54, 162, 235, 0.1)',
            'rgba(255, 206, 86, 0.1)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: { scales: {} }
    });
  }
}