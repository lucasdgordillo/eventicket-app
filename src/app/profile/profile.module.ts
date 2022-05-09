import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSettingsPage } from './pages/profile-settings/profile-settings.page';
import { EventCategoriesPage } from './pages/event-categories/event-categories.page';
import { EventCategoryModalPage } from './pages/event-category-modal/event-category-modal.page';

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
    EventCategoryModalPage
  ],
  providers: []
})
export class ProfileModule {}
