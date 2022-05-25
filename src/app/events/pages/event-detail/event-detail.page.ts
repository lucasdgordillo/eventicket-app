import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'even-datail-page',
  templateUrl: 'event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  eventId;
  eventData;
  readonly defaultImage = 'https://media.istockphoto.com/photos/dancing-friends-picture-id501387734?k=20&m=501387734&s=612x612&w=0&h=1mli5b7kpDg428fFZfsDPJ9dyVHsWsGK-EVYZUGWHpI=';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}
  
  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.params.eventId;
    this.loadEventInformation();
  }

  loadEventInformation() {
    this.eventsService.getEventById(this.eventId).subscribe((event) => {
      this.eventData = event.data;
    });
  }

  formatDate(date) {
    return moment(date).format('LL');
  }

  formatTime(time) {
    return time;
  }

  goToCheckout() {
    this.router.navigate([`/events/event-checkout/${this.eventId}`]);
  }
}