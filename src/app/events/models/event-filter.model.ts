export class EventFilter {
  title: string;
  artist: string;
  productor: string;
  category: string;
  place: string;

  constructor(title: string = '', artist: string = '', productor: string = '', category: string = '', place: string = '') {
    this.title = title;
    this.artist = artist;
    this.productor = productor;
    this.category = category;
    this.place = place;
  }
}