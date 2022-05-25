import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsPage } from './pages/events/events.page';
import { EventPage } from './pages/event/event.page';
import { PricesModal } from './pages/prices-modal/prices.modal';
import { ItemPriceComponent } from './components/item-price/item-price.component';
import { EventDetailPage } from './pages/event-detail/event-detail.page';
import { EventCheckoutPage } from './pages/event-checkout/event-checkout.page';

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
    EventPage,
    PricesModal,
    ItemPriceComponent,
    EventDetailPage,
    EventCheckoutPage
  ],
  providers: []
})
export class EventsModule {}
