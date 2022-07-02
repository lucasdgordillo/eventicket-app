import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { EventsService } from 'src/app/shared/services/events.service';
import { RrppModalPage } from '../rrpp-modal/rrpp-modal.page';

@Component({
  selector: 'event-rrpps-page',
  templateUrl: 'event-rrpps.page.html',
  styleUrls: ['./event-rrpps.page.scss'],
})

export class EventRrppsPage implements OnInit, OnDestroy {
  rrpps = [];
  private ngUnsubscribe = new Subject();

  constructor(
    private modalController: ModalController,
    private eventsService: EventsService,
    private loadingHelper: LoadingHelper,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit() {
    this.loadRrpps();
  }

  doRefresh(event) {
    this.rrpps = [];
    this.loadRrpps();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  async loadRrpps() {
    this.loadingHelper.present();
    this.eventsService.getAllRrpps().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.rrpps = response.data;
      this.loadingHelper.dismiss();
    });
  }

  public async openRrppModal(rrppData = null) {
    const modal = await this.modalController.create({
      component: RrppModalPage,
      componentProps: {
        rrppData: rrppData
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.action === 'create') {
        this.loadingHelper.present();
        this.eventsService.createRrpp(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('RRPP creado con éxito!');
          this.loadRrpps();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'update') {
        this.loadingHelper.present();
        this.eventsService.editRrpp(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('RRPP actualizado con éxito!');
          this.loadRrpps();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'delete') {
        this.loadingHelper.present();
        this.eventsService.deleteRrpp(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('RRPP eliminado con éxito!');
          this.loadRrpps();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
    }
  }

  public editRrpp(event) {
    const rrppData = this.rrpps.find((rrpp) => { if (rrpp.id == event.id) { return rrpp; }});
    this.openRrppModal(rrppData);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}