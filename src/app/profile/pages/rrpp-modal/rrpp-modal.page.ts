import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Rrpp } from '../../models/rrpp.interface';

@Component({
  selector: 'rrpp-modal',
  templateUrl: 'rrpp-modal.page.html',
  styleUrls: ['./rrpp-modal.page.scss'],
})

export class RrppModalPage implements OnInit {
  @Input() rrppData: Rrpp = null;
  editMode: boolean = false;

  public rrppForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    fullName: new FormControl('', Validators.required),
    salePercentage: new FormControl('', [ Validators.required, CustomValidators.number]),
    productor: new FormControl('')
  });

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.setProductorId();
    if (this.rrppData) {
      this.editMode = true;
      this.rrppForm.get('id').setValue(this.rrppData.id);
      this.rrppForm.get('fullName').setValue(this.rrppData.fullName);
      this.rrppForm.get('salePercentage').setValue(this.rrppData.salePercentage);
    }
  }

  setProductorId() {
    this.authService.getUserId().subscribe((userId: number) => {
      this.rrppForm.get('productor').setValue(userId);
    });
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  public createAction() {
    if (!this.rrppForm.valid) {
      this.touchForms();
    } else {
      const data = {
        action: 'create',
        value: this.rrppForm.value
      }
      this.dismiss(data);
    }
  }

  public updateAction() {
    const data = {
      action: 'update',
      value: this.rrppForm.value
    };
    this.dismiss(data);
  }

  public deleteAction() {
    const data = {
      action: 'delete',
      value: this.rrppForm.value.id
    };
    this.dismiss(data);
  }

  touchForms() {
    Object.keys(this.rrppForm.controls).forEach((field) => {
      const control = this.rrppForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  public invalid(control: FormControl) {
    return !control.valid && control.touched && control.dirty;
  }

  get fullName(): FormControl {
    return this.rrppForm.get('fullName') as FormControl;
  }

  get salePercentage(): FormControl {
    return this.rrppForm.get('salePercentage') as FormControl;
  }
}