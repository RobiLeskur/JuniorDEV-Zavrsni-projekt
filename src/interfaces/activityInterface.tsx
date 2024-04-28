import Volunteer from "./VolunteerInterface";

export default interface Activity {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    organization: string;
    volunteers: Volunteer[];
  }

  