import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { MessageHelper } from 'src/app/shared/helpers/message.helper';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role.enum';

@Component({
  selector: 'login-page',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
  });

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService,
    private router: Router,
    private messageHelper: MessageHelper
  ) { }

  loginAction() {
    if (!this.loginForm.valid) {
      this.touchForms();
    } else {
      this.loadingHelper.present();
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe((user) => {
        this.loadingHelper.dismiss();
        if (user.role !== Role.CHECKER) {
          this.router.navigate(['/tabs/events']);
        } else {
          this.router.navigate(['/tabs/scanned-tickets']);
        }
      },
      (error) => {
        this.loadingHelper.dismiss();
        this.messageHelper.showAlertError('Credenciales inválidas');
      });
    }
  }

  touchForms() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
}