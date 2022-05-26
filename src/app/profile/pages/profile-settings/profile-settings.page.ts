import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'profile-settings-page',
  templateUrl: 'profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})

export class ProfileSettingsPage implements OnInit {
  role: Role = Role.USER;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });
  }

  public openPage(page) {
    this.router.navigate([page]);
  }

  logoutAction() {
    this.authService.logout();
  }
}