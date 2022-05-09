import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-settings-page',
  templateUrl: 'profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})

export class ProfileSettingsPage implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public openPage(page) {
    this.router.navigate([page]);
  }
}