import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'intro-page',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss']
})
export class IntroPage implements OnInit {
  public defaultImage = '/assets/images/intro/photoparty1.jpeg';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openCreateAccountPage() {
    this.router.navigate(['/create-account']);
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }
}
