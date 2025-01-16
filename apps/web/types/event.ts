export type EventCategory = 'Conference' | 'Workshop' | 'Seminar' | 'Concert' | 'Exhibition';

export type EventLocation = {
  city: string;
  venue: string;
  address: string;
};

export type TicketType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

export type Promotion = {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  validUntil: Date;
  referralCode?: string;
};

export type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: EventLocation;
  startDate: Date;
  endDate: Date;
  isFree: boolean;
  ticketTypes: TicketType[];
  promotions: Promotion[];
  reviews: Review[];
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};