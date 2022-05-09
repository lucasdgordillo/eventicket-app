import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingHelper {
  private loadingModal: any;
  private isModalOpen = false;

  constructor(
    private loadingCtr: LoadingController
  ) {}

  public async present(message: string = 'cargando...') {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.loadingModal = this.loadingCtr.create({
        message: message
      });
      await (await this.loadingModal).present();
    }
    return this.loadingModal;
  }

  public async dismiss() {
    if (this.loadingModal) {
      await this.loadingModal.then((loading => {
        loading.dismiss();
        this.isModalOpen = false;
        this.loadingModal = null;
      }));
    }
  }
}
