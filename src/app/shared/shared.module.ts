import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IntroPage } from './pages/intro/intro.page';
import { TabsPage } from './pages/tabs/tabs.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    IntroPage,
    TabsPage
  ],
  exports: [],
  entryComponents: [],
  providers: []
})
export class SharedModule {}