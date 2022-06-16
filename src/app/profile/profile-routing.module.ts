import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCategoriesPage } from './pages/event-categories/event-categories.page';
import { EventPlacesPage } from './pages/event-places/event-places.page';
import { EventRrppsPage } from './pages/event-rrrps/event-rrpps.page';
import { FaqPage } from './pages/faq/faq.page';
import { ProfileSettingsPage } from './pages/profile-settings/profile-settings.page';
import { TermsAndConditionsPage } from './pages/terms-and-conditions/terms-and-conditions.page';
import { UsersPage } from './pages/users/users.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsPage
  },
  {
    path: 'categories',
    component: EventCategoriesPage
  },
  {
    path: 'places',
    component: EventPlacesPage
  },
  {
    path: 'rrpps',
    component: EventRrppsPage
  },
  {
    path: 'users',
    component: UsersPage
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsPage
  },
  {
    path: 'faq',
    component: FaqPage
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
