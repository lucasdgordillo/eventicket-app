import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCategoriesPage } from './pages/event-categories/event-categories.page';
import { ProfileSettingsPage } from './pages/profile-settings/profile-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsPage
  },
  {
    path: 'categories',
    component: EventCategoriesPage
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
