import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EventCategory } from '../../models/event-category.interface';

@Component({
  selector: 'event-category-modal',
  templateUrl: 'event-category-modal.page.html',
  styleUrls: ['./event-category-modal.page.scss'],
})

export class EventCategoryModalPage implements OnInit {
  @Input() categoryData: EventCategory = null;
  editMode: boolean = false;

  public categoryForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {
    if (this.categoryData) {
      this.editMode = true;
      this.categoryForm.get('id').setValue(this.categoryData.id);
      this.categoryForm.get('name').setValue(this.categoryData.name);
    }
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  public createCategoryAction() {
    if (!this.categoryForm.valid) {
      this.touchForms();
    } else {
      const data = {
        action: 'create',
        value: this.categoryForm.get('name').value
      }
      this.dismiss(data);  
    }
  }

  public updateCategoryAction() {
    const data = {
      action: 'update',
      value: this.categoryForm.value
    };
    this.dismiss(data);
  }

  public deleteCategoryAction() {
    const data = {
      action: 'delete',
      value: this.categoryForm.value.id
    };
    this.dismiss(data);
  }

  touchForms() {
    Object.keys(this.categoryForm.controls).forEach((field) => {
      const control = this.categoryForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  public invalid(control: FormControl) {
    return !control.valid && control.touched && control.dirty;
  }

  get name(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }
}