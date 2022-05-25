import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'profile-settings-page',
  templateUrl: 'profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})

export class ProfileSettingsPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  public openPage(page) {
    this.router.navigate([page]);
  }

  logoutAction() {
    this.authService.logout();
  }
}