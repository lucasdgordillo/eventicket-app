import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageHelper {
  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  async presentToast(message: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'top',
      mode: "ios",
      color: "dark"
    });
    await toast.present();
  }

  async showAlertError(message, backdrop = true) {
    const alert = await this.alertCtrl.create({
      message,
      header: 'Error',
      cssClass: 'alert-error',
      buttons: ['ok'],
      backdropDismiss: backdrop
    });
    await alert.present();
  }
}