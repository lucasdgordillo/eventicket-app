import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Chart, registerables } from 'chart.js';
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { EventsService } from "src/app/shared/services/events.service";
import { ReportsService } from "../../services/reports.service";
Chart.register(...registerables);

@Component({
  selector: 'sales-report-page',
  templateUrl: 'sales-report.page.html',
  styleUrls: ['./sales-report.page.scss']
})
export class SalesReportPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;
  events = [];

  constructor(
    private router: Router,
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
    this.loadLineChartMethod();
  }

  loadLineChartMethod(datasets = []) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'],
        datasets: datasets
      }
    });
  }

  getRandomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  getValuesByMonth(eventData) {
    let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    eventData.forEach(value => {
      switch (value.month) {
        case 'Jan':
          data[0] = data[0] + Number(value.total);
          return;
        case 'Feb':
          data[1] = data[0] + Number(value.total);
          return;
        case 'Mar':
          data[2] = data[0] + Number(value.total);
          return;
        case 'Apr':
          data[3] = data[0] + Number(value.total);
          return;
        case 'May':
          data[4] = data[0] + Number(value.total);
          return;
        case 'Jun':
          data[5] = data[0] + Number(value.total);
          return;
        case 'Jul':
          data[6] = data[0] + Number(value.total);
          return;
        case 'Aug':
          data[7] = data[0] + Number(value.total);
          return;
        case 'Sep':
          data[8] = data[0] + Number(value.total);
          return;
        case 'Oct':
          data[9] = data[0] + Number(value.total);
          return;
        case 'Nov':
          data[10] = data[0] + Number(value.total);
          return;
        case 'Dic':
          data[11] = data[0] + Number(value.total);
          return;
      }  
    });

    return data;
  }

  filterAction(event) {
    this.loadingHelper.present();
    this.reportsService.getSalesReport(event.value).subscribe((response) => {
      const data = response.data;

      // Separo los nombres de eventos
      let eventNames = [];
      data.forEach(element => {
        eventNames.push(element.eventName);
      });

      // Elimino los repetidos
      let eventName = eventNames.filter((item,index)=>{
        return eventNames.indexOf(item) === index;
      });

      // Creo los datasets objets
      let datasets = [];
      datasets.push(this.createDataset(eventName, this.getValuesByMonth(data)));

      this.lineChart.destroy();
      this.loadLineChartMethod(datasets);
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  createDataset(eventName, data) {
    return {
      label: eventName,
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
      spanGaps: false
    }
  }
}