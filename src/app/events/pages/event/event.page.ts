import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";
import * as moment from 'moment';
import { EventsService } from 'src/app/shared/services/events.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PricesModal } from "../prices-modal/prices.modal";
import { AuthService } from "src/app/auth/services/auth.service";
import { LoadingHelper } from "src/app/shared/helpers/loading.helper";
import { Router } from "@angular/router";
import { MessageHelper } from "src/app/shared/helpers/message.helper";

@Component({
  selector: 'event-page',
  templateUrl: 'event.page.html',
  styleUrls: ['./event.page.scss'],
})

export class EventPage implements OnInit {
  categories = [];
  prices = [];
  productorId;
  showPricesError: boolean = false;
  
  public eventForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    imagePath: new FormControl(''),
    productor: new FormControl(''),
    category: new FormControl('', Validators.required),
    prices: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    releaseSellDateTime: new FormControl('', Validators.required),
    endSellDateTime: new FormControl('', Validators.required)
  });

  constructor(
    private eventsService: EventsService,
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingHelper: LoadingHelper,
    private router: Router,
    private messageHelper: MessageHelper
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.setProductorId();
  }

  setProductorId() {
    this.authService.getUserId().subscribe((userId: number) => {
      this.eventForm.get('productor').setValue(userId);
    });
  }

  async loadCategories() {
    this.eventsService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data;
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });
 
    console.log(image);
}

  createEvent() {
    this.eventsService.createEvent(this.eventForm.value).subscribe((response) => {
      this.loadingHelper.dismiss();
      this.messageHelper.presentToast('Evento creado con exito!', 2500);
      this.router.navigate(['/tabs/events']);
    },
    (error) => {
      console.log(error);
      this.loadingHelper.dismiss();
      this.messageHelper.showAlertError("Hubo un problema. Intente nuevamente");
    });
  }

  async confirmCreateEvent() {
    if (!this.eventForm.valid) {
      this.touchForms();
    } else {
      if (!this.isPricesArrayEmpty()) { return; }
      const alert = await this.alertController.create({
        header: 'Crear evento',
        message: 'Esta usted seguro de crear este evento?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Confirmar',
            handler: () => { 
              this.loadingHelper.present();
              this.createEvent(); 
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  isValid() {
    return this.eventForm.valid;
  }

  isPricesArrayEmpty () {
    if (this.prices.length < 1) {
      this.showPricesError = true;
      return false;
    } else {
      return true;
    }
  }

  async openPricesModal() {
    this.showPricesError = false;
    const modal = await this.modalController.create({
      component: PricesModal,
      componentProps: {
        pricesData: this.prices
      },
      swipeToClose: true
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      if (data.values) {
        this.prices = data.values;
        this.eventForm.get('prices').setValue(this.getFormatedPrices(this.prices));
      }
    }
  }

  getFormatedPrices(prices) {
    const formatedPrices = [];
    prices.forEach(item => {
      formatedPrices.push({ name: item.name, price: item.price });
    });

    return formatedPrices;
  }

  setDateTimeValue(event, formName, format = '') {
    let value = event.value;
    if (format !== '') {
      value = moment(value).format(format);
    }
    this.eventForm.get(formName).setValue(value);
  }

  touchForms() {
    Object.keys(this.eventForm.controls).forEach((field) => {
      const control = this.eventForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  public invalid(control: FormControl) {
    return !control.valid && control.touched && control.dirty;
  }

  get title(): FormControl {
    return this.eventForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.eventForm.get('description') as FormControl;
  }

  get artist(): FormControl {
    return this.eventForm.get('artist') as FormControl;
  }

  get category(): FormControl {
    return this.eventForm.get('category') as FormControl;
  }

  get date(): FormControl {
    return this.eventForm.get('date') as FormControl;
  }

  get startTime(): FormControl {
    return this.eventForm.get('startTime') as FormControl;
  }

  get endTime(): FormControl {
    return this.eventForm.get('endTime') as FormControl;
  }

  get releaseSellDateTime(): FormControl {
    return this.eventForm.get('releaseSellDateTime') as FormControl;
  }

  get endSellDateTime(): FormControl {
    return this.eventForm.get('endSellDateTime') as FormControl;
  }
}