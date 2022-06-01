import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'events-page',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit, OnDestroy {
  role: Role = Role.USER;
  events = [];
  private ngUnsubscribe = new Subject();

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.loadingHelper.present();
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getAllEvents().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
      this.events = response.data;
      this.loadingHelper.dismiss();
    });
  }

  createNewEvent() {
    this.router.navigate(['/events/event']);
  }

  openEventDetail(event) {
    this.router.navigate([`/events/event-detail/${event.id}`]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}