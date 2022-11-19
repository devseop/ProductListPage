export interface ClubListFromServer {
  club: Club;
  createdAt: string;
  leaders: Leader[];
  partners: Partner[];
  price: number;
}

export interface Club {
  coverUrl: string;
  description: string;
  id: string;
  meetings: Meeting[];
  name: string;
  place: string;
  type: string;
}

export interface Meeting {
  endedAt: string;
  order: number;
  startedAt: string;
}

export interface Leader {
  name: string;
}

export interface Partner {
  name: string;
}

export type CardInfo = {
  id: string;
  thumbnail: string;
  title: string;
  desc: string;
  leader: string;
  partner: string;
  endTime: string;
  place: string;
  startTime: string;
};

export type MeetInfo = {
  id: string;
  endTime: string;
  place: string;
  startTime: string;
};
