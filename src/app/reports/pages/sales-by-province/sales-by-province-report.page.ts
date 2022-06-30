import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, registerables } from 'chart.js';
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { EventsService } from "src/app/shared/services/events.service";
import { ReportsService } from "../../services/reports.service";
Chart.register(...registerables);

@Component({
  selector: 'sales-by-province-report-page',
  templateUrl: 'sales-by-province-report.page.html',
  styleUrls: ['./sales-by-province-report.page.scss']
})
export class SalesByProvinceReport implements OnInit, AfterViewInit {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  doughnutChart: any;
  reportData;
  events = [];

  constructor(
    private eventsService: EventsService,
    private reportsService: ReportsService,
    private loadingHelper: LoadingHelper
  ) { }

  ngOnInit(): void {
    this.loadEvents();
    this.loadReport();
  }

  loadReport(filters = null) {
    this.loadingHelper.present();
    this.reportsService.getTicketsQuantityByProvince(filters).subscribe((response) => {
      const data = response.data;
      const names = [];
      const totals = [];

      data.forEach(element => {
        names.push(element.province);
        totals.push(element.total);
      });

      this.doughnutChart.destroy();
      this.loadDoughnutChartMethod(names, totals);
      this.loadingHelper.dismiss();
    }, error => {
      this.loadingHelper.dismiss();
    });
  }

  ngAfterViewInit() {
    this.loadDoughnutChartMethod();
  }

  loadEvents() {
    this.eventsService.getAllEvents().subscribe((response) => {
      this.events = response.data;
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  filterAction(event) {
    this.loadReport(event.value);
  }

  loadDoughnutChartMethod(dataX = [], dataY = []) {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: dataX,
        datasets: [{
          label: 'Cantidad de tickets',
          data: dataY,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }
}