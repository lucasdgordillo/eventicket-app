import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsPage } from './pages/events/events.page';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsPage,
    EventCardComponent
  ],
  providers: []
})
export class EventsModule {}
