import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean;
  host?: Profile;
  attendees?: Profile[];
}

export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date: string = "";
  city: string = "";
  venue: string = "";

  constructor(init?: ActivityFormValues) {
    if (init) {
      this.id = init.id;
      this.title = init.title;
      this.category = init.category;
      this.description = init.description;
      this.date = init.date;
      this.city = init.city;
      this.venue = init.venue;
    }
  }
}
