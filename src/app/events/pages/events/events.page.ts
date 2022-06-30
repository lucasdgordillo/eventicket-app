import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { EventsService } from 'src/app/shared/services/events.service';
import { EventFilter } from '../../models/event-filter.model';
import { EventFilterModalPage } from '../event-filter/event-filter.modal';

@Component({
  selector: 'events-page',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  role: Role = Role.USER;
  events = [];
  params: any;
  filterData: EventFilter = new EventFilter();

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.params;
    this.loadingHelper.present();
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
    this.loadEvents();
  }

  doRefresh(event) {
    this.events = [];
    this.loadEvents();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  loadEvents() {
    this.eventsService.getAllEvents(this.filterData).subscribe((response) => {
      this.events = response.data;
      this.loadingHelper.dismiss();
    });
  }

  filterAction(data) {
    this.filterData = new EventFilter(data.eventTitle, data.eventArtist, data.eventProductor, data.eventCategory, data.eventPlace);
    this.loadEvents();
  }

  createNewEvent() {
    this.router.navigate(['/events/event']);
  }

  openEventDetail(event) {
    this.router.navigate([`/events/event-detail/${event.id}`]);
  }

  async openFilters() {
    const modal = await this.modalController.create({
      component: EventFilterModalPage,
      componentProps: {
        filterData: this.filterData
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.filterAction(data);
    }
  }
}