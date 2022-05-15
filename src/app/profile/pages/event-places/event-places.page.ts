import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { EventsService } from 'src/app/shared/services/events.service';
import { EventPlaceModalPage } from '../event-place-modal/event-place-modal.page';

@Component({
  selector: 'event-places-page',
  templateUrl: 'event-places.page.html',
  styleUrls: ['./event-places.page.scss'],
})

export class EventPlacesPage implements OnInit, OnDestroy {
  eventPlaces = [];
  private ngUnsubscribe = new Subject();

  constructor(
    private modalController: ModalController,
    private eventsService: EventsService,
    private loadingHelper: LoadingHelper,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit() {
    this.loadEventPlaces();
  }

  loadEventPlaces() {
    this.eventsService.getAllEventPlaces().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.eventPlaces = response.data;
    });
  }

  public async openEventPlaceModal(eventPlaceData = null) {
    const modal = await this.modalController.create({
      component: EventPlaceModalPage,
      componentProps: {
        placeData: eventPlaceData
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.action === 'create') {
        this.loadingHelper.present();
        this.eventsService.createEventPlace(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Categoría creada con exito!');
          this.loadEventPlaces();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'update') {
        this.loadingHelper.present();
        this.eventsService.editEventPlace(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Lugar actualizado con exito!');
          this.loadEventPlaces();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'delete') {
        this.loadingHelper.present();
        this.eventsService.deleteEventPlace(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Lugar eliminado con exito!');
          this.loadEventPlaces();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
    }
  }

  public editEventPlace(event) {
    const eventPlaceData = this.eventPlaces.find((eventPlace) => { if (eventPlace.id == event.id) { return eventPlace; }});
    this.openEventPlaceModal(eventPlaceData);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}