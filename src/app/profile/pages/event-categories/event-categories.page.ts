import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { EventsService } from 'src/app/shared/services/events.service';
import { EventCategoryModalPage } from '../event-category-modal/event-category-modal.page';

@Component({
  selector: 'event-categories-page',
  templateUrl: 'event-categories.page.html',
  styleUrls: ['./event-categories.page.scss'],
})

export class EventCategoriesPage implements OnInit, OnDestroy {
  categories = [];
  private ngUnsubscribe = new Subject();

  constructor(
    private modalController: ModalController,
    private eventsService: EventsService,
    private loadingHelper: LoadingHelper,
    private messageHelper: MessageHelper
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  doRefresh(event) {
    this.categories = [];
    this.loadCategories();
    setTimeout(() => {
      event.target.complete();
    }, 1);
  }

  loadCategories() {
    this.loadingHelper.present();
    this.eventsService.getAllCategories().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: any) => {
      this.categories = response.data;
      this.loadingHelper.dismiss();
    });
  }

  public async openCategoryModal(categoryData = null) {
    const modal = await this.modalController.create({
      component: EventCategoryModalPage,
      componentProps: {
        categoryData: categoryData
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.action === 'create') {
        this.loadingHelper.present();
        this.eventsService.createCategory({ name: data.value }).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Categoría creada con éxito!');
          this.loadCategories();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'update') {
        this.loadingHelper.present();
        this.eventsService.editCategory(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Categoría actualizada con éxito!');
          this.loadCategories();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
      if (data.action === 'delete') {
        this.loadingHelper.present();
        this.eventsService.deleteCategory(data.value).subscribe(() => {
          this.loadingHelper.dismiss();
          this.messageHelper.presentToast('Categoría eliminada con éxito!');
          this.loadCategories();
        },
        (error) => {
          this.loadingHelper.dismiss();
          this.messageHelper.showAlertError(error.error.error);
        });
      }
    }
  }

  public editCategory(event) {
    const categoryData = this.categories.find((category) => { if (category.id == event.id) { return category; }});
    this.openCategoryModal(categoryData);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}