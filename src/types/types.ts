export interface IClubListFromServer {
  club: IClubFromServer;
  createdAt: string;
  leaders: ILeaders[];
  partners: IPartners[];
  price: number;
}

export interface IClubFromServer {
  coverUrl: string;
  description: string;
  id: string;
  meetings: IMeeting[];
  name: string;
  place: string;
  type: string;
}

export interface IClub {
  id: string;
  thumbnail: string;
  title: string;
  desc: string;
  leaders: ILeaders[];
  partners: IPartners[];
  endTime: string;
  place: string;
  startTime: string;
  meeting: IMeeting[];
  price: number;
}

export interface IMeeting {
  endedAt: string;
  order: number;
  startedAt: string;
}

export interface ILeaders {
  name: string;
}

export interface IPartners {
  name: string;
}
