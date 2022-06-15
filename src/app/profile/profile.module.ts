import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSettingsPage } from './pages/profile-settings/profile-settings.page';
import { EventCategoriesPage } from './pages/event-categories/event-categories.page';
import { EventCategoryModalPage } from './pages/event-category-modal/event-category-modal.page';
import { EventPlacesPage } from './pages/event-places/event-places.page';
import { EventRrppsPage } from './pages/event-rrrps/event-rrpps.page';
import { EventPlaceModalPage } from './pages/event-place-modal/event-place-modal.page';
import { RrppModalPage } from './pages/rrpp-modal/rrpp-modal.page';
import { UsersPage } from './pages/users/users.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileSettingsPage,
    EventCategoriesPage,
    EventCategoryModalPage,
    EventPlacesPage,
    EventRrppsPage,
    EventPlaceModalPage,
    EventRrppsPage,
    RrppModalPage,
    UsersPage
  ],
  providers: []
})
export class ProfileModule {}
