import { AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Role } from 'src/app/auth/models/role.enum';
import { ProvincesService } from 'src/app/profile/services/provinces.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';

@Component({
  selector: 'edit-user-modal-page',
  templateUrl: 'edit-user-modal.page.html',
  styleUrls: ['./edit-user-modal.page.scss'],
})

export class EditUserModalPage implements OnInit {
  @Input() userData: any;
  provinces = [];

  public userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    displayName: new FormControl(''),
    dniNumber: new FormControl('', Validators.compose([Validators.required])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    province: new FormControl('', Validators.required)
  });

  constructor(
    private loadingHelper: LoadingHelper,
    private provincesService: ProvincesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadingHelper.present();
    this.loadUserData();
    this.loadProvinces();
  }

  loadUserData() {
    this.userForm.get('id').setValue(this.userData.id);
    this.userForm.get('firstName').setValue(this.userData.firstName);
    this.userForm.get('lastName').setValue(this.userData.lastName);
    this.userForm.get('displayName').setValue(this.userData.displayName);
    this.userForm.get('dniNumber').setValue(this.userData.dniNumber);
    this.userForm.get('phoneNumber').setValue(this.userData.phoneNumber);
    this.userForm.get('email').setValue(this.userData.email);
  }

  private loadProvinces() {
    this.provincesService.getAllProvinces().subscribe((provinces) => {
      this.provinces = provinces.data;
      this.userForm.get('province').setValue(this.userData.province.id);
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  touchForms() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  public createAction() {
    if (!this.userForm.valid) {
      this.touchForms();
    } else {
      if (this.userData.role === Role.USER || this.userData.role === Role.CHECKER) {
        this.userForm.removeControl('displayName');
      }

      const data = {
        action: 'update',
        value: this.userForm.value
      }
      this.dismiss(data);
    }
  }
}