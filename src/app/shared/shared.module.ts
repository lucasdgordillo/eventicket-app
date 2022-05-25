import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IntroPage } from './pages/intro/intro.page';
import { TabsPage } from './pages/tabs/tabs.page';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { DatetimeModal } from './pages/datetime-modal/datetime.modal';
import { ItemDatetimeComponent } from './components/item-datetime/item-datetime.component';
import { PaymentModal } from './pages/payment-modal/payment.modal';
import { ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from './components/event-card/event-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [
    IntroPage,
    TabsPage,
    CardItemComponent,
    ErrorDisplayComponent,
    DatetimeModal,
    ItemDatetimeComponent,
    PaymentModal,
    EventCardComponent
  ],
  exports: [
    CardItemComponent,
    ErrorDisplayComponent,
    DatetimeModal,
    ItemDatetimeComponent,
    PaymentModal,
    EventCardComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}