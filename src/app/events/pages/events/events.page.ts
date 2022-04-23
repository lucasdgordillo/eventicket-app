import { Component, OnInit } from '@angular/core';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';

@Component({
  selector: 'events-page',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {

  constructor(
    private loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    console.log("estoy en events page");
  }
}