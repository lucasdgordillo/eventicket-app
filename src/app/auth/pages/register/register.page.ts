import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register-page',
  templateUrl: 'register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dniNumber: new FormControl('', Validators.compose([Validators.required])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
  });

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService
  ) { }

  createAccount() {
    if (!this.registerForm.valid) {
      this.touchForms();
    } else {
      this.loadingHelper.present();
      this.authService.register(this.registerForm.value).subscribe(() => {
        console.log("user registrado con exito");
        this.loadingHelper.dismiss();
      },
      (error) => {
        this.loadingHelper.dismiss();
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
}