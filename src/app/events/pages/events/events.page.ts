import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/auth/models/role.enum';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingHelper } from 'src/app/shared/helpers/loading.helper';
import { Event } from '../../models/event.interface';

@Component({
  selector: 'events-page',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  cards = [];
  role: Role = Role.USER;

  constructor(
    private loadingHelper: LoadingHelper,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUserRole().subscribe((role: Role) => {
      this.role = role;
    });

    this.role = Role.PRODUCTOR;

    console.log(this.role);

    this.cards = [
      { name: 'Marco Carola', price: 5000, date: '18 de Mayo', place: 'La Fabrica', organizator: 'Meed', image: 'https://comingsoon.ae/wp-content/uploads/2019/11/IMG_0095.jpg' },
      { name: 'Pan-Pot', price: 3000, date: '22 de Mayo', place: 'XL Abasto', organizator: 'Terrafuria', image: 'https://cdn.happeningnext.com/events6/banners/0d588253494ec80ac4106e82a86e5aae0757bdb7251079a0d2646ab8254f09aa-rimg-w526-h296-gmir.jpg?v=1639410355' }
    ]
  }

  createNewEvent() {
    this.router.navigate(['/events/event']);
  }
}