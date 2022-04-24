import { Component, OnInit } from '@angular/core';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { Event } from '../../models/event.model';

@Component({
  selector: 'events-page',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  cards = [];

  constructor(
    private loadingHelper: LoadingHelper
  ) { }

  ngOnInit() {
    this.cards = [
      { name: 'Marco Carola', price: 5000, date: '18 de Mayo', place: 'La Fabrica', organizator: 'Meed', image: 'https://comingsoon.ae/wp-content/uploads/2019/11/IMG_0095.jpg' },
      { name: 'Pan-Pot', price: 3000, date: '22 de Mayo', place: 'XL Abasto', organizator: 'Terrafuria', image: 'https://cdn.happeningnext.com/events6/banners/0d588253494ec80ac4106e82a86e5aae0757bdb7251079a0d2646ab8254f09aa-rimg-w526-h296-gmir.jpg?v=1639410355' }
    ]
  }
}