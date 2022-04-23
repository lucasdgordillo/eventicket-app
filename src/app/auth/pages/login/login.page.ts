import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
  ) { }

  loginAction() {
    if (!this.loginForm.valid) {
      this.touchForms();
    } else {
      this.loadingHelper.present();
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe((user) => {
        console.log(user);

        console.log("user registrado con exito");
        this.loadingHelper.dismiss();
        this.router.navigate(['/tabs/events']);
      },
      (error) => {
        this.loadingHelper.dismiss();
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