import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'event-filter-modal',
  templateUrl: 'event-filter.modal.html',
  styleUrls: ['./event-filter.modal.scss'],
})

export class EventFilterModalPage implements OnInit {
  eventPlaces = [];
  eventCategories = [];
  provinces = [];

  public filterForm: FormGroup = new FormGroup({
    eventTitle: new FormControl(''),
    eventArtist: new FormControl(''),
    eventDate: new FormControl(''),
    eventPlace: new FormControl(''),
    eventCategory: new FormControl('')
  });

  constructor(
    private eventsService: EventsService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadFormData()
  }

  loadFormData() {
    this.eventsService.getAllCategories().subscribe((response) => {
      this.eventCategories = response.data;
    });
    this.eventsService.getAllEventPlaces().subscribe((response) => {
      this.eventPlaces = response.data;
    });
  }

  filterAction() {
    this.dismiss(this.filterForm.value);
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  resetFiltersAction() {
    this.filterForm.reset();
  }
}