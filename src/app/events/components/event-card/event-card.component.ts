import { Component, Input, OnInit } from "@angular/core";
import { Role } from "src/app/auth/models/role.enum";

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.component.html',
  styleUrls: ['event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventImage: string = '';
  @Input() eventName: string;
  @Input() eventDate: string;
  @Input() eventPlace: string = '';
  @Input() eventOrganizator: string = '';

  constructor(

  ) {}

  ngOnInit() {
    
  }
}