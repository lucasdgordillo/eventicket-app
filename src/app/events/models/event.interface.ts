import { EventCategory } from "src/app/profile/models/event-category.interface";

export interface Event {
  id?: number;
  title?: string;
  description?: string;
  artist?: string;
  imagePath?: string;
  category?: EventCategory;
  prices?: [];
  date?: string;
  startTime?: string;
  endTime?: string;
  releaseSellDateTime?: string;
  endSellDateTime?: string;
}