import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Role } from "src/app/auth/models/role.enum";

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.component.html',
  styleUrls: ['event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventId: number;
  @Input() eventImage: string = '';
  @Input() eventName: string;
  @Input() eventDate: string;
  @Input() eventPlace: string = '';
  @Input() eventOrganizator: string = '';
  @Output() cardClickedEventAction = new EventEmitter();
  readonly defaultImage = 'https://media.istockphoto.com/photos/dancing-friends-picture-id501387734?k=20&m=501387734&s=612x612&w=0&h=1mli5b7kpDg428fFZfsDPJ9dyVHsWsGK-EVYZUGWHpI=';

  constructor(
  ) {}

  ngOnInit() {
    
  }

  onCardClicked() {
   this.cardClickedEventAction.emit({ id: this.eventId }); 
  }
}