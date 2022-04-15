import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IntroPage } from './pages/intro/intro.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    IntroPage
  ],
  exports: [],
  entryComponents: [],
  providers: []
})
export class SharedModule {}