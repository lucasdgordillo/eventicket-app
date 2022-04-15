import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'intro-page',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss']
})
export class IntroPage implements OnInit {
  public defaultImage = '/assets/images/intro/photoparty1.jpeg';

  constructor(
  ) { }

  ngOnInit() {
  }
}
