import { EventCategory } from "src/app/profile/models/event-category.interface";
import { EventPlace } from "src/app/profile/models/event-place.interface";

export interface Event {
  id?: number;
  title?: string;
  description?: string;
  artist?: string;
  imagePath?: string;
  category?: EventCategory;
  place?: EventPlace;
  prices?: [];
  date?: string;
  startTime?: string;
  endTime?: string;
  releaseSellDateTime?: string;
  endSellDateTime?: string;
}