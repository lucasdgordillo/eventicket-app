import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPage } from './pages/register/register.page';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule {}
