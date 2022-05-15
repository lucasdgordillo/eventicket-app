import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventPlace } from '../../models/event-place.interface';
import { ProvincesService } from '../../services/provinces.service';

@Component({
  selector: 'event-place-modal',
  templateUrl: 'event-place-modal.page.html',
  styleUrls: ['./event-place-modal.page.scss'],
})

export class EventPlaceModalPage implements OnInit {
  @Input() placeData: EventPlace = null;
  editMode: boolean = false;
  provinces = [];

  public eventPlaceForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required)
  });
x
  constructor(
    private modalController: ModalController,
    private provincesService: ProvincesService
  ) {}

  ngOnInit() {
    this.provincesService.getAllProvinces().subscribe((provinces) => {
      this.provinces = provinces.data;
    });

    if (this.placeData) {
      this.editMode = true;
      this.eventPlaceForm.get('id').setValue(this.placeData.id);
      this.eventPlaceForm.get('name').setValue(this.placeData.name);
      this.eventPlaceForm.get('address').setValue(this.placeData.address);
      this.eventPlaceForm.get('latitude').setValue(this.placeData.latitude);
      this.eventPlaceForm.get('longitude').setValue(this.placeData.longitude);
      this.eventPlaceForm.get('province').setValue(this.placeData.province['id']);
    }
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  public createAction() {
    if (!this.eventPlaceForm.valid) {
      this.touchForms();
    } else {
      const data = {
        action: 'create',
        value: this.eventPlaceForm.value
      }
      this.dismiss(data);  
    }
  }

  public updateAction() {
    const data = {
      action: 'update',
      value: this.eventPlaceForm.value
    };
    this.dismiss(data);
  }

  public deleteAction() {
    const data = {
      action: 'delete',
      value: this.eventPlaceForm.value.id
    };
    this.dismiss(data);
  }

  touchForms() {
    Object.keys(this.eventPlaceForm.controls).forEach((field) => {
      const control = this.eventPlaceForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  public invalid(control: FormControl) {
    return !control.valid && control.touched && control.dirty;
  }

  get name(): FormControl {
    return this.eventPlaceForm.get('name') as FormControl;
  }

  get address(): FormControl {
    return this.eventPlaceForm.get('address') as FormControl;
  }

  get latitude(): FormControl {
    return this.eventPlaceForm.get('latitude') as FormControl;
  }

  get longitude(): FormControl {
    return this.eventPlaceForm.get('longitude') as FormControl;
  }

  get province(): FormControl {
    return this.eventPlaceForm.get('province') as FormControl;
  }
}