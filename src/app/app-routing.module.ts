import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroPage } from './shared/pages/intro/intro.page';
import { TabsPage } from './shared/pages/tabs/tabs.page';

const routes: Routes = [
  { path: '', component: IntroPage },
  { path: 'tabs', component: TabsPage, children: [
    {
      path: '',
      redirectTo: '/tabs/events',
      pathMatch: 'full'
    },
    {
      path: 'events',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./events/events.module').then(m => m.EventsModule)
        }
      ]
    },
    {
      path: 'tickets',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./tickets/tickets.module').then(m => m.TicketsModule)
        }
      ]
    },
    {
      path: 'profile',
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./profile/profile.module').then(m => m.ProfileModule)
        }
      ]
    }
  ]},
  {
    path: 'profile',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
