import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailPage } from './pages/event-detail/event-detail.page';
import { EventPage } from './pages/event/event.page';
import { EventsPage } from './pages/events/events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: 'event',
    component: EventPage
  },
  {
    path: 'event-detail/:eventId',
    component: EventDetailPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
