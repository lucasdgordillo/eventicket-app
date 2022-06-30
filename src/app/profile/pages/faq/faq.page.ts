import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';

@Component({
  selector: 'faq-page',
  templateUrl: 'faq.page.html',
  styleUrls: ['./faq.page.scss'],
})

export class FaqPage implements OnInit {
  userRol: Role;

  constructor(
    private authService: AuthService,
    private loadingHelper: LoadingHelper
  ) {}

  ngOnInit() {
    this.loadingHelper.present();
    this.authService.getUserRole().subscribe((role: Role) => {
      this.userRol = role;
      this.loadingHelper.dismiss();
    }, error => {
      this.loadingHelper.dismiss();
    });
  }
}