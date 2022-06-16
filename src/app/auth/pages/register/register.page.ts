import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProvincesService } from 'src/app/profile/services/provinces.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Role } from '../../models/role.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register-page',
  templateUrl: 'register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  @Input() modalMode: boolean = false;
  @Input() userData: any;
  @Input() userId: string = '';
  @Input() userRol: Role = Role.USER;
  provinces = [];

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    displayName: new FormControl(''),
    dniNumber: new FormControl('', Validators.compose([Validators.required])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    province: new FormControl('', Validators.required),
    role: new FormControl(''),
    createdBy: new FormControl('')
  });

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService,
    private messageHelper: MessageHelper,
    private router: Router,
    private provincesService: ProvincesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadingHelper.present();
    if (this.userData) { this.loadUserData(); }
    this.loadProvinces();
  }

  loadUserData() {
    this.registerForm.get('firstName').setValue(this.userData.firstName);
    this.registerForm.get('lastName').setValue(this.userData.lastName);
    this.registerForm.get('displayName').setValue(this.userData.displayName);
    this.registerForm.get('dniNumber').setValue(this.userData.dniNumber);
    this.registerForm.get('phoneNumber').setValue(this.userData.phoneNumber);
    this.registerForm.get('email').setValue(this.userData.email);
    this.registerForm.get('province').setValue(this.userData.province.id);
  }

  private loadProvinces() {
    this.provincesService.getAllProvinces().subscribe((provinces) => {
      this.provinces = provinces.data;
      this.loadingHelper.dismiss();
    }, (error) => {
      this.loadingHelper.dismiss();
    });
  }

  createAccount() {
    if (!this.registerForm.valid) {
      this.touchForms();
    } else {
      this.loadingHelper.present();
      this.registerForm.removeControl('createdBy');
      this.registerForm.removeControl('displayName');
      this.registerForm.get('role').setValue(Role.USER);
      this.authService.register(this.registerForm.value).subscribe(() => {
        this.loadingHelper.dismiss();
        this.messageHelper.presentToast('Usuario creado con exito!', 2500);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.loadingHelper.dismiss();
        this.messageHelper.showAlertError('Error. Intente nuevamente en unos minutos');
      });
    }
  }

  touchForms() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  dismiss(data = null) {
    this.modalController.dismiss(data);
  }

  public createAction() {
    if (!this.registerForm.valid) {
      this.touchForms();
    } else {
      if (this.userRol === Role.ADMIN) {
        this.registerForm.get('role').setValue(Role.PRODUCTOR);
        this.registerForm.get('createdBy').setValue(Number(this.userId));
      } 
      if (this.userRol === Role.PRODUCTOR) {
        this.registerForm.get('role').setValue(Role.CHECKER);
        this.registerForm.get('createdBy').setValue(Number(this.userId));
      }

      const data = {
        action: 'create',
        value: this.registerForm.value
      }
      this.dismiss(data);
    }
  }

  public deleteAction() {
    const data = {
      action: 'delete',
      value: this.registerForm.value.id
    };
    this.dismiss(data);
  }
}