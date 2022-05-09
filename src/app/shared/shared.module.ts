import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IntroPage } from './pages/intro/intro.page';
import { TabsPage } from './pages/tabs/tabs.page';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    IntroPage,
    TabsPage,
    CardItemComponent,
    ErrorDisplayComponent
  ],
  exports: [
    CardItemComponent,
    ErrorDisplayComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}